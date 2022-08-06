import { AppDataSource } from '../database/data-source';
import { Settings as TypeOrmSettings } from '../entity/Settings';

class Settings {
  /**
   * Gets a connection to a database entity
   * @author Nico
   * @private
   * @return Promise - Promise of the database
   * @version 1
   * @since 10.06.2021 07:40
   */
  private getDB = () => AppDataSource.getRepository(TypeOrmSettings);

  /**
   * Check if a key is already in the database to prevent duplicate keys in table
   * @author Nico
   * @param {string}key Key which should be checked f exists
   * @private
   * @return Promise resolve if no key was found, reject if key was found or error occurred
   * @version 2
   * @since 10.06.2021 07:42
   * Updated to v2 26.06.2021 01:23
   */
  public doesKeyExists(key: string): Promise<TypeOrmSettings[]> {
    return new Promise((resolve, reject) => {
      this.getDB()
        .findBy({ key })
        .then((result) => {
          if (result.length !== 0) return resolve(result);
          reject();
        })
        .catch(() => reject());
    });
  }

  /**
   * Update the value of a settingsKey in DB Table
   * @author Nico
   * @param {string}key Key to update
   * @param {string}value New value to save
   * @return Promise
   * @version 2
   * @since 10.06.2021 07:47
   * Updated 26.06.2021 01:27
   */
  public async updateKey(key: string, value: string) {
    return new Promise((resolve, reject) => {
      this.doesKeyExists(key)
        .then(() => {
          this.getDB().update(key, { value }).then(resolve, reject);
        })
        .catch(() => reject('Key not found'));
    });
  }

  /**
   * Resolves the value of a settingsKey in DB Table and resolves its value as string
   * @author Nico
   * @param {string}key Key to update
   * @return Promise
   * @version 1
   * @since 26.06.2021 01:27
   */
  public async getKeyValue(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.doesKeyExists(key)
        .then((keys) => {
          resolve(keys[0].value);
        })
        .catch(() => reject('Key not found'));
    });
  }
}

export default new Settings();
