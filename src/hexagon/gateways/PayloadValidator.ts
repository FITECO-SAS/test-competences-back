export interface PayloadValidator {
  /**
   * Valide les données.
   * @param rules Règles de validation
   * @param payload Données
   * @throws InvalidPayloadException
   */
  validate(rules: Array<unknown>, payload: Record<string, any>): Promise<void>
}
