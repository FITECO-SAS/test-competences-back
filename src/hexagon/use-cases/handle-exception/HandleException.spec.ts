
import { LogProviderStub } from '@secondary/gateways/log-provider/LogProviderStub';
import { ExecuteData, HandleException } from './HandleException';

describe('Gestion des exceptions', () => {
  let logProvider: LogProviderStub;
  let handleException: HandleException;

  const data: ExecuteData = {
    path: '/test',
    controller: 'TestController',
    action: 'get',
    method: 'post',
    query: {
      valueQuery1: 'value1',
      valueQuery2: 'value2',
    },
    body: {
      valueBody1: 'value3',
      valueBody2: 'value4',
    },
  };

  beforeEach(() => {
    logProvider = new LogProviderStub();
    handleException = new HandleException(logProvider);
  });

  describe('Gestion des erreurs non gérées', () => {
    test('Doit intercepter les erreurs non gérées', () => {
      const processExecution = () => {
        throw new Error();
      };
      const execute = () => handleException.execute(data, processExecution);
      expect(execute).not.toThrow();
      expect(logProvider.errorParams).toEqual([{
        message: `[500] → ${data.method.toUpperCase()} ${data.path} (${data.controller}.${data.action})`,
      }]);
    });

    test('Doit envoyer les informations des erreurs inconnues', async () => {
      const processExecution = () => {
        throw new Error('Erreur inconnue 1');
      };

      const result = await handleException.execute(data, processExecution);
      expect(result).toEqual({
        response: {
          status: 500,
          content: {
            type: 'unknown_error',
            message: 'Une erreur est survenue.',
          },
        },
        type: 'unknown_error',
        className: 'Error',
        stackTrace: result!.stackTrace,
      });
    });

    test('Doit envoyer les informations des erreurs envoyées en string', async () => {
      const processExecution = () => {
      // eslint-disable-next-line no-throw-literal
        throw 'Erreur inconnue 2';
      };
      const result = await handleException.execute(data, processExecution);
      expect(result).toEqual({
        response: {
          status: 500,
          content: {
            type: 'unknown_error',
            message: 'Une erreur est survenue.',
          },
        },
        type: 'unknown_error',
        className: 'string',
        stackTrace: undefined,
      });
    });
  });
});
