import { IHealthCheck, IVersion } from '../interfaces/IndexService.interface';

class IndexService {
  public version(): IVersion {
    return { version: 'v0.0.1' };
  }
  public healthCheck(): IHealthCheck {
    return {
      healthy: true,
      date: Date.now(),
    };
  }
}

export default IndexService;
