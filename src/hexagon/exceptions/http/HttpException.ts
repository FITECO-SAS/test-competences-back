/**
 * Erreur HTTP.
 * La base de toutes les exceptions envoyées par l'API.
 */
export abstract class HttpException extends Error {
  private readonly _status;
  private readonly _type;

  public constructor(status: number, type: string, message: string) {
    super(message);
    this._status = status;
    this._type = type;
  }

  public getResponse(): { type: string, message: string } {
    return {
      type: this.type,
      message: this.message,
    };
  }

  public get status() {
    return this._status;
  }

  public get type() {
    return this._type;
  }
}
