import { ValidationErrorItem } from 'joi';
import { Error } from '../interfaces/HTTPResponse';
import BadRequest from './BadRequest';

class InputException extends BadRequest {
  private readonly errorDetails: ValidationErrorItem[];

  constructor(errorDetails: ValidationErrorItem[]) {
    super('Bad Request');
    this.errorDetails = errorDetails;
  }

  public getBody(): Error {
    return { ...super.getBody(), errorDetails: this.errorDetails };
  }
}

export default InputException;
