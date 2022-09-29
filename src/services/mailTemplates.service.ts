import { ITemplate, templates } from '../entity/Templates';
import { v4 } from 'uuid';

class MailTemplatesService {
  public async deleteTemplate(id: string) {
    const res = await templates.deleteOne({ uuid: id });
    return res;
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
    return templates.create(obj);
  }
  public async updateTemplate(id: string, newObj: ITemplate) {
    console.log(newObj);
    newObj.lastEdited = Math.floor(Date.now() / 1000);
    console.log(newObj, id);
    return templates.findOneAndUpdate({ uuid: id }, newObj, {
      new: true,
      upsert: false,
    });
  }
}

export default MailTemplatesService;
