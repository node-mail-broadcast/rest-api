import { IMailServer, mailServerModel } from '../entity/mailServer';
import { v4 } from 'uuid';
import {
  AbstractDefaultService,
  getUnixTimestamp,
} from '@kopf02/express-utils';

class MailServerService extends AbstractDefaultService<IMailServer, string> {
  // @ts-ignore
  async create(
    obj: IMailServer,
    id: string | undefined
  ): Promise<IMailServer | null /*todo fix*/> {
    if (id) {
      obj.lastEdited = getUnixTimestamp(); //todo https://masteringjs.io/tutorials/mongoose/timestamps
      return mailServerModel.findOneAndUpdate(
        { uuid: id },
        { $set: obj, $inc: { __v: 1 } },
        { new: true }
      );
    } else {
      obj.uuid = v4();
      obj.lastEdited = getUnixTimestamp(); //todo https://masteringjs.io/tutorials/mongoose/timestamps
      return mailServerModel.create(obj);
    }
  }

  async get(id: string): Promise<IMailServer | null> {
    return mailServerModel.findOne({ uuid: id });
  }

  async list(): Promise<IMailServer[]> {
    return mailServerModel.find();
  }
}
export default MailServerService;
