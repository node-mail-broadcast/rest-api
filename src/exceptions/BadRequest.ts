import HttpException from './HttpException';
import { logger } from '../utils/logger';
import { LeveledLogMethod } from 'winston';

class BadRequest extends HttpException {
  constructor(error: string) {
    super(400, error);
  }

  public logLevel(): LeveledLogMethod {
    return logger.warn;
  }
}

export default BadRequest;
