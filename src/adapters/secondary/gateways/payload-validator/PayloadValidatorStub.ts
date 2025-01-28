import { PayloadValidator } from '@hexagon/gateways/PayloadValidator';

export class PayloadValidatorStub implements PayloadValidator {
  private _validationError: Error | null = null;
  private _validateParams: Array<Record<string, any>> = [];

  public async validate(rules: Array<unknown>, payload: Record<string, any>) {
    this._validateParams.push({ rules, payload });
    if (this._validationError) throw this._validationError;
  }

  public set validationError(validationError: Error | null) {
    this._validationError = validationError;
  }

  public get validateParams() {
    return this._validateParams;
  }
}
