import { HttpException } from "./HttpException";

export class UnprocessableEntityException extends HttpException {
  public constructor(private readonly _errors: Record<string, unknown>) {
    super(422, 'invalid_fields', 'Données invalides');
  }

  public getResponse() {
    return {
      type: this.type,
      message: this.message,
      details: this._errors,
    };
  }
}
