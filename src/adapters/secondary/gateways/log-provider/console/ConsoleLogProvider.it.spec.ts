import 'colors';
import { ConsoleLogProvider } from './ConsoleLogProvider';
import { DateManagerStub } from '@secondary/gateways/date-manager/DateManagerStub';
import { DateProviderStub } from '@secondary/gateways/date-provider/DateProviderStub';

describe('Ajout des logs dans la console', () => {
  const dateProvider = new DateProviderStub();
  const dateManager = new DateManagerStub();
  const logProvider = new ConsoleLogProvider(dateProvider, dateManager);

  describe('Ajout des logs d\'information', () => {
    beforeEach(() => {
      console.info = jest.fn();
    });

    test('Doit ajouter un log d\'information 1', () => {
      dateProvider.dateNow = new Date('2023-01-01 16:17:18');
      logProvider.info('message 1');
      expect(console.info).toBeCalledWith(`[formatAsDateTime-${new Date('2023-01-01 16:17:18').toISOString()}] message 1`.cyan);
    });

    test('Doit ajouter un log d\'information 2', () => {
      dateProvider.dateNow = new Date('2023-01-01 08:10:20');
      logProvider.info('message 2');
      expect(console.info).toBeCalledWith(`[formatAsDateTime-${new Date('2023-01-01 08:10:20').toISOString()}] message 2`.cyan);
    });
  });

  describe('Ajout des logs d\'erreur', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });

    test('Doit ajouter un log d\'erreur 1', () => {
      dateProvider.dateNow = new Date('2023-01-01 16:17:18');
      logProvider.error('message 1');
      expect(console.error).toBeCalledWith(`[formatAsDateTime-${new Date('2023-01-01 16:17:18').toISOString()}] message 1`.red);
    });

    test('Doit ajouter un log d\'erreur 2', () => {
      dateProvider.dateNow = new Date('2023-01-01 08:10:20');
      logProvider.error('message 2');
      expect(console.error).toBeCalledWith(`[formatAsDateTime-${new Date('2023-01-01 08:10:20').toISOString()}] message 2`.red);
    });
  });
});
