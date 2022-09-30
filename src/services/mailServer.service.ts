import { IMailServer, mailServerModel } from '../entity/mailServer';
import { unixTimestamp } from '../lib/utils';
import { v4 } from 'uuid';

class MailServerService {
  public async getServer(id?: string) {
    if (id) {
      return mailServerModel.findOne({ uuid: id });
    } else return mailServerModel.find();
  }
  public async deleteServer(id: string) {
    return mailServerModel.deleteOne({ uuid: id });
  }
  public async updateServer(id: string, data: IMailServer) {
    data.lastEdited = unixTimestamp();
    return mailServerModel.updateOne(
      { uuid: id },
      { $set: data, $inc: { __v: 1 } },
      { new: true }
    );
  }
  public async createServer(data: IMailServer) {
    data.uuid = v4();
    data.lastEdited = unixTimestamp();
    return mailServerModel.create(data);
  }
}
export default MailServerService;
