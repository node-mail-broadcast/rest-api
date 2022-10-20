import { MaintenanceMiddleware } from '@kopf02/express-utils';

class CustomMaintenanceMiddleware extends MaintenanceMiddleware {
  getEnabledStatus(): Promise<boolean> {
    //todo
    /**
     *      Settings.getKeyValue(this.maintenanceDBKey)
     *         .then((value) => {
     *           resolve(value === 'true');
     *         })
     *         .catch(reject);
     */
    return Promise.resolve(false);
  }

  protected setEnabledStatus(_newState: boolean): Promise<void> {
    //todo
    /**
     *       Settings.updateKey(
     *               this.maintenanceDBKey,
     *               newValue ? 'true' : 'false'
     *             ).then(resolve, reject);
     */
    return Promise.resolve(undefined);
  }
}

export default CustomMaintenanceMiddleware;
