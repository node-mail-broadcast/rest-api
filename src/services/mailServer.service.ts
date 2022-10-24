import { IMailServer, mailServerModel } from '../entity/mailServer';
import { v4 } from 'uuid';
import {
  AbstractDefaultService,
  getUnixTimestamp,
} from '@kopf02/express-utils';

class MailServerService extends AbstractDefaultService<IMailServer, string> {
  async update(
    id: string | undefined,
    obj: IMailServer
  ): Promise<IMailServer | null> {
    obj.lastEdited = getUnixTimestamp(); //todo https://masteringjs.io/tutorials/mongoose/timestamps
    return mailServerModel.findOneAndUpdate(
      { uuid: id },
      { $set: obj, $inc: { __v: 1 } },
      { new: true }
    );
  }

  async create(
    obj: IMailServer,
    _id: string | undefined
  ): Promise<IMailServer> {
    if (_id) obj.uuid = _id;
    else obj.uuid = v4();
    obj.lastEdited = getUnixTimestamp(); //todo https://masteringjs.io/tutorials/mongoose/timestamps
    return mailServerModel.create(obj);
  }

  async get(id: string): Promise<IMailServer | null> {
    return mailServerModel.findOne({ uuid: id });
  }

  async list(): Promise<IMailServer[]> {
    return mailServerModel.find();
  }

  async delete(id: string): Promise<number> {
    const res = await mailServerModel.deleteOne({ uuid: id });
    return res.deletedCount;
  }
}
export default MailServerService;
