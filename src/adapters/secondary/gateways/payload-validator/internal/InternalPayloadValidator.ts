import { BaseValidator, RequestValidator } from '@myfiteco/validator';
import { InvalidPayloadException } from '@hexagon/exceptions/payload/InvalidPayloadException';
import { PayloadValidator } from '@hexagon/gateways/PayloadValidator';

export class InternalPayloadValidator implements PayloadValidator {
  public async validate(rules: Array<BaseValidator>, payload: Record<string, any>) {
    try {
      await new RequestValidator(rules, payload, {}).validate();
    } catch (errors: any) {
      throw new InvalidPayloadException(errors);
    }
  }
}
