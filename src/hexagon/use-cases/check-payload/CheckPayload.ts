import { PayloadValidator } from '@hexagon/gateways/PayloadValidator';

export class CheckPayload {
  public constructor(
    private readonly _payloadValidator: PayloadValidator,
  ) {}

  /**
   * Vérification des données
   * @param rules Régles de validation
   * @param payload Données à valider
   */
  public async execute(rules: Array<unknown>, payload: Record<string, any>) {
    await this._payloadValidator.validate(rules, payload);
  }
}
