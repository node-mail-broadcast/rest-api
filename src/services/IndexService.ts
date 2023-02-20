import { IHealthCheck, IVersion } from '../interfaces/IndexService.interface';
import { EmailSenderClient } from '../lib/EmailSenderClient';

class IndexService {
  private sendClient: EmailSenderClient;
  constructor() {
    this.sendClient = new EmailSenderClient();
  }
  public version(): IVersion {
    return { version: 'v0.0.1' };
  }
  public healthCheck(): IHealthCheck {
    return {
      healthy: true,
      date: Date.now(),
    };
  }

  public async sendMail(body: any) {
    //send a email
    try {
      await this.sendClient.sendEmail(body);
      return true;
    } catch (_e) {
      return false;
    }
  }
}

export default IndexService;
