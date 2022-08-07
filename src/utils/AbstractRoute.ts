import Route from '../interfaces/routes.interface';
import { Router } from 'express';

export abstract class AbstractRoute implements Route {
  public readonly router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  abstract getPath(): string;

  abstract initializeRoutes(): void;
}
