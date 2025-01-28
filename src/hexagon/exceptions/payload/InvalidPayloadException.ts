export class InvalidPayloadException extends Error {
  public constructor(private readonly _errors: Record<string, unknown>) {
    super('Données invalides');
  }

  public get errors() {
    return this._errors;
  }
}
