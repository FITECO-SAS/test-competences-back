import { UnprocessableEntityException } from '@hexagon/exceptions/http/UnprocessableEntityException';
import { InvalidPayloadException } from '@hexagon/exceptions/payload/InvalidPayloadException';
import { CheckPayload } from './CheckPayload';
import { PayloadValidatorStub } from '@secondary/gateways/payload-validator/PayloadValidatorStub';

describe('Validation des données reçues', () => {
  let payloadValidator: PayloadValidatorStub;
  let checkPayload: CheckPayload;

  beforeEach(() => {
    payloadValidator = new PayloadValidatorStub();
    checkPayload = new CheckPayload(payloadValidator);
  });

  test('Doit générer une erreur si une valeur est invalide', async () => {
    const payload = { name: 'KO' };
    const rules = ['rule1', 'rule2'];
    payloadValidator.validationError = new InvalidPayloadException({ name: 'invalide' });
    const execute = () => checkPayload.execute(rules, payload);
    await expect(execute).rejects.toThrow(new UnprocessableEntityException({ name: 'invalide' }));
    expect(payloadValidator.validateParams).toEqual([{ rules, payload }]);
  });

  test('Ne doit pas générer d\'erreur si les données sont toutes valides', async () => {
    const payload = { name: 'OK' };
    const rules = ['rule1', 'rule2'];
    await checkPayload.execute(rules, payload);
    expect(payloadValidator.validateParams).toEqual([{ rules, payload }]);
  });
});
