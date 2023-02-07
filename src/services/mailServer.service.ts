import { IMailServer, mailServerModel } from '../entity/mailServer';
import { v4 } from 'uuid';
import { ParsedQs } from 'qs';
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

  async getWithTags(
    id: string,
    query: string | string[] | ParsedQs | ParsedQs[]
  ): Promise<IMailServer | null> {
    return mailServerModel.findOne({ uuid: id, tags: query || undefined });
  }

  async listWithTags(
    query: string | string[] | ParsedQs | ParsedQs[] | undefined
  ): Promise<IMailServer[]> {
    return mailServerModel.find({ tags: query || undefined });
  }

  async delete(id: string): Promise<number> {
    const res = await mailServerModel.deleteOne({ uuid: id });
    return res.deletedCount;
  }
}
export default MailServerService;
