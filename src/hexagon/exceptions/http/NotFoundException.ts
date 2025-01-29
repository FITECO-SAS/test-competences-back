import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  public constructor() {
    super(404, 'not_found', 'Entité non trouvée');
  }

  public getResponse() {
    return {
      type: this.type,
      message: this.message,
    };
  }
}
