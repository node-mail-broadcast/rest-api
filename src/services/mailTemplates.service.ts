import { templates } from '../entity/Templates';

class MailTemplatesService {
  public async deleteTemplate(id: string) {
    const res = await templates.deleteOne({ uuid: id });
    return res;
  }
}

export default MailTemplatesService;
