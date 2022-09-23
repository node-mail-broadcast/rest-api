import Settings from '../lib/settings';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { HttpExceptions, HTTPResponse, logger } from '@kopf02/express-utils';

/**
 * This class is all about the maintenance mode
 * You can control if the mode is enabled or not and fetches its value
 * @author Nico
 * @version 1
 * @since 26.06.2021
 * @class
 */
export default class MaintenanceMiddleware {
  private static _instance: MaintenanceMiddleware;

  static getInstance(): MaintenanceMiddleware {
    return this._instance;
  }

  /**
   * Variable to store the maintenance mode value to not fetch the value every request
   *
   * This may change in the future to prevent caching issues
   * @private
   * @author Nico
   * @version 1
   * @since 26.06.2021
   */
  private _isEnabled = true;

  /**
   * Variable to store the Timestamp for the last Update of the maintenance mode
   *
   * @private
   * @author Jens Hummel
   * @version 1
   * @since 26.06.2021
   */
  private lastCheck: Date;

  /**
   * The maintenance mode state key for the settings table in the mysql database
   *
   * I don't think about a feature to make this key changeable
   * @private
   * @readonly
   * @constant
   * @author Nico
   * @version 1
   * @since 26.06.2021
   */
  private readonly maintenanceDBKey = 'maintenance';

  /**
   * Fetches the initial value of the maintenance state for the API
   * @author Nico
   * @version 1
   * @since 26.06.2021
   * @constructor
   */
  constructor(defaultState = false) {
    MaintenanceMiddleware._instance = this;
    this._isEnabled = defaultState;
    this.getEnabledStatus()
      .then((value) => {
        this._isEnabled = value;
        this.lastCheck = new Date();
      })
      .catch(logger.error);
  }

  /**
   * Fetches the maintenance mode state of the DB & arses it to a boolean
   * @return Promise
   * @private
   * @author Nico
   * @version 1
   * @since 26.06.2021 02:15
   */
  private getEnabledStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Settings.getKeyValue(this.maintenanceDBKey)
        .then((value) => {
          resolve(value === 'true');
        })
        .catch(reject);
    });
  }

  /**
   * Getter function for the isEnabled boolean
   * @author Nico
   * @return boolean - The maintenance mode state
   * @version 1
   * @since 26.06.2021
   */
  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  /**
   * Set the maintenance mode
   * - Checks if maintenance mode is already active / not active
   * - Saves new value in DB
   * @param {boolean}newValue - The new State of the maintenance mode
   * @return Promise
   * @author Nico, Jens Hummel
   * @version 1.1
   * @since 26.06.2021 02:24
   */
  public setMaintenanceStatus(newValue: boolean) {
    return new Promise((resolve, reject) => {
      this.getEnabledStatus()
        .then((value) => {
          if (value === newValue)
            reject(
              'Maintenance mode already ' + value ? 'enabled' : 'disabled'
            );
          else {
            this._isEnabled = value;
            Settings.updateKey(
              this.maintenanceDBKey,
              newValue ? 'true' : 'false'
            ).then(resolve, reject);
          }
        })
        .catch(logger.error);
    });
  }

  /**
   * Checks for the maintenance mode status
   *
   * If enabled, send error and end request, else, call next()
   * @param {Request}_req - Express Request
   * @param _res
   * @param {NextFunction}next - Express NextFunction
   * @author Nico, Jens Hummel
   * @version 2
   * @since 26.06.2021 03:02
   */
  public ExpressMiddleWare = (
    _req: Request,
    _res: Response<HTTPResponse<any>>,
    next: NextFunction
  ) => {
    //skip maintenance mode for testing purposes
    if (config.get('env') === 'test') return next();

    this.checkUpdate();

    logger.debug('Maintenance Middleware called.');

    if (this.isEnabled) {
      logger.debug('Request during maintenance!');
      return next(
        new HttpExceptions.HttpException(401, 'Maintenance mode enabled')
      );
    }

    next();
  };

  /**
   * Periodical check, if Maintenance Mode status changed
   *
   * @author Jens Hummel
   * @version 1
   * @since 26.06.2021 12:15
   */
  private checkUpdate() {
    const currentDate = new Date();

    if (
      this.lastCheck?.getMilliseconds() + 1000 * 60 * 5 <
      currentDate.getMilliseconds()
    ) {
      this.getEnabledStatus()
        .then((value) => {
          if (value !== null && value != this.isEnabled) {
            logger.info('Maintenance Mode ' + value ? 'enabled' : 'disabled');
            this._isEnabled = value;
            this.lastCheck = currentDate;
          }
        })
        .catch(console.log);
    }
  }
}
