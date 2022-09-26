import { ITemplate, templates } from '../entity/Templates';

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
}

export default MailTemplatesService;
