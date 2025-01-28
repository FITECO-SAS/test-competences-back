import { InvalidPayloadException } from '@hexagon/exceptions/payload/InvalidPayloadException';
import { Validator } from '@myfiteco/validator';
import { InternalPayloadValidator } from './InternalPayloadValidator';

describe('Validation des données avec la librairie Validator', () => {
  test('Doit envoyer une erreur si une valeur est invalide', async () => {
    const internalPayloadValidator = new InternalPayloadValidator();

    const rules = [Validator.number('value', 'valeur', true)];
    const payload = { value: 'ko' };

    const execute = () => internalPayloadValidator.validate(rules, payload);
    await expect(execute).rejects.toThrow(InvalidPayloadException);
    const exception = await execute().catch((e) => e);
    expect(exception._errors).toEqual({
      value: {
        type: 'number.type',
        error: 'La valeur est invalide.',
        params: {},
      },
    });
  });

  test('Doit formater les données si elles sont toutes valides', async () => {
    const internalPayloadValidator = new InternalPayloadValidator();

    const rules = [Validator.string('value').upper()];
    const payload = { value: 'ok' };

    await internalPayloadValidator.validate(rules, payload);
    expect(payload).toEqual({ value: 'OK' });
  });
});
