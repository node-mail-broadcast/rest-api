import { ITemplate, templates } from '../entity/Templates';
import { v4 } from 'uuid';
import {
  AbstractDefaultService,
  getUnixTimestamp,
} from '@kopf02/express-utils';

class MailTemplatesService extends AbstractDefaultService<ITemplate, string> {
  public async delete(id: string) {
    return (await templates.deleteOne({ uuid: id }))?.deletedCount || 0;
  }

  async get(id: string): Promise<ITemplate | null> {
    return templates.findOne({ uuid: id });
  }

  public async list(): Promise<ITemplate[]> {
    return templates.find() || [];
  }

  public async create(obj: ITemplate) {
    obj.uuid = v4();
    obj.lastEdited = getUnixTimestamp();
    return templates.create(obj);
  }
  public async update(id: string, newObj: ITemplate) {
    console.log(newObj);
    newObj.lastEdited = getUnixTimestamp();
    console.log(newObj, id);
    return templates.findOneAndUpdate(
      { uuid: id },
      { $set: newObj, $inc: { __v: 1 } },
      {
        new: true,
        upsert: false,
      }
    );
  }
}

export default MailTemplatesService;
