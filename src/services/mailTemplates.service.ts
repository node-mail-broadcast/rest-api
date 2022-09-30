import { ITemplate, templates } from '../entity/Templates';
import { v4 } from 'uuid';
import { unixTimestamp } from '../lib/utils';

class MailTemplatesService {
  public async deleteTemplate(id: string) {
    return await templates.deleteOne({ uuid: id });
  }

  public async getTemplates(
    id?: string
  ): Promise<ITemplate | ITemplate[] | null> {
    if (id) {
      return templates.findOne({ uuid: id });
    } else {
      return templates.find();
    }
  }

  public async saveTemplate(obj: ITemplate) {
    obj.uuid = v4();
    obj.lastEdited = unixTimestamp();
    return templates.create(obj);
  }
  public async updateTemplate(id: string, newObj: ITemplate) {
    console.log(newObj);
    newObj.lastEdited = unixTimestamp();
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
