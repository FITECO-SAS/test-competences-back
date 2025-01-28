import { FnsDateManager } from './FnsDateManager';

describe('Gestion des dates', () => {
  const dateManager = new FnsDateManager();
  const date = new Date('2023/08/04-12:54:03');

  describe('Formatages', () => {
    test('Formatage en date', () => {
      expect(dateManager.formatAsDate(date)).toEqual('2023/08/04');
    });

    test('Formatage en date française', () => {
      expect(dateManager.formatAsFrenchDate(date)).toEqual('04/08/2023');
    });

    test('Formatage en date tiret', () => {
      expect(dateManager.formatAsDashDate(date)).toEqual('2023-08-04');
    });

    test('Formatage en date digits', () => {
      expect(dateManager.formatAsDateDigits(date)).toEqual('20230804');
    });

    test('Formatage en date heure', () => {
      expect(dateManager.formatAsDateTime(date)).toEqual('2023/08/04-12:54:03');
    });

    test('Formatage en année/mois', () => {
      expect(dateManager.formatAsYearMonth(date)).toEqual('2023/08');
    });

    test('Formatage en mois/année', () => {
      expect(dateManager.formatAsMonthYear(date)).toEqual('08/2023');
    });
  });

  describe('Ajout d\'années', () => {
    test('Ne doit pas changer la date en ajoutant 0 année', () => {
      expect(dateManager.addYears(date, 0)).toEqual(new Date('2023/08/04-12:54:03'));
    });

    test('Doit ajouter une année à une date', () => {
      expect(dateManager.addYears(date, 1)).toEqual(new Date('2024/08/04-12:54:03'));
    });

    test('Doit soustraire une année si le nombre d\'année est négatif', () => {
      expect(dateManager.addYears(date, -1)).toEqual(new Date('2022/08/04-12:54:03'));
    });
  });

  describe('Ajout de mois', () => {
    test('Ne doit pas changer la date en ajoutant 0 mois', () => {
      expect(dateManager.addMonths(date, 0)).toEqual(new Date('2023/08/04-12:54:03'));
    });

    test('Doit ajouter une mois à une date', () => {
      expect(dateManager.addMonths(date, 1)).toEqual(new Date('2023/09/04-12:54:03'));
    });

    test('Doit soustraire un mois si le nombre de mois est négatif', () => {
      expect(dateManager.addMonths(date, -1)).toEqual(new Date('2023/07/04-12:54:03'));
    });
  });

  describe('Ajout de jours', () => {
    test('Ne doit pas changer la date en ajoutant 0 jours', () => {
      expect(dateManager.addDays(date, 0)).toEqual(new Date('2023/08/04-12:54:03'));
    });

    test('Doit ajouter un jour à une date', () => {
      expect(dateManager.addDays(date, 1)).toEqual(new Date('2023/08/05-12:54:03'));
    });

    test('Doit soustraire un jour si le nombre de jour est négatif', () => {
      expect(dateManager.addDays(date, -1)).toEqual(new Date('2023/08/03-12:54:03'));
    });
  });

  describe('Ajout d\'heures', () => {
    test('Ne doit pas changer la date en ajoutant 0 heure', () => {
      expect(dateManager.addHours(date, 0)).toEqual(new Date('2023/08/04-12:54:03'));
    });

    test('Doit ajouter une heure à une date', () => {
      expect(dateManager.addHours(date, 1)).toEqual(new Date('2023/08/04-13:54:03'));
    });

    test('Doit soustraire une heure si le nombre d\'heure est négatif', () => {
      expect(dateManager.addHours(date, -1)).toEqual(new Date('2023/08/04-11:54:03'));
    });
  });

  describe('Soustraction d\'années', () => {
    test('Ne doit pas changer la date en soustrayant 0 année', () => {
      expect(dateManager.subtractYears(date, 0)).toEqual(new Date('2023/08/04-12:54:03'));
    });

    test('Doit soustraire une année à une date', () => {
      expect(dateManager.subtractYears(date, 1)).toEqual(new Date('2022/08/04-12:54:03'));
    });

    test('Doit ajouter une année si le nombre d\'année est négatif', () => {
      expect(dateManager.subtractYears(date, -1)).toEqual(new Date('2024/08/04-12:54:03'));
    });
  });

  describe('Soustraction de mois', () => {
    test('Ne doit pas changer la date en soustrayant 0 mois', () => {
      expect(dateManager.subtractMonths(date, 0)).toEqual(new Date('2023/08/04-12:54:03'));
    });

    test('Doit soustraire un mois à une date', () => {
      expect(dateManager.subtractMonths(date, 1)).toEqual(new Date('2023/07/04-12:54:03'));
    });

    test('Doit ajouter un mois si le nombre de mois est négatif', () => {
      expect(dateManager.subtractMonths(date, -1)).toEqual(new Date('2023/09/04-12:54:03'));
    });
  });

  describe('Fin de mois', () => {
    test('Doit prendre le dernier jour du mois', () => {
      expect(dateManager.endOfMonth(new Date('2023/01/15-12:54:03'))).toEqual(new Date('2023/01/31-23:59:59.999'));
    });
  });

  describe('Comparaison de dates', () => {
    describe('Est avant', () => {
      test('Doit retourner vrai si la date est avant la date de comparaison', () => {
        const dateToCompare = new Date('2023/08/04-12:54:04');
        expect(dateManager.isBefore(date, dateToCompare)).toBeTruthy();
      });

      test('Doit retourner faux si la date est après la date de comparaison', () => {
        const dateToCompare = new Date('2023/08/04-12:54:02');
        expect(dateManager.isBefore(date, dateToCompare)).toBeFalsy();
      });
    });

    describe('Est après', () => {
      test('Doit retourner vrai si la date est après la date de comparaison', () => {
        const dateToCompare = new Date('2023/08/04-12:54:02');
        expect(dateManager.isAfter(date, dateToCompare)).toBeTruthy();
      });

      test('Doit retourner faux si la date est avant la date de comparaison', () => {
        const dateToCompare = new Date('2023/08/04-12:54:04');
        expect(dateManager.isAfter(date, dateToCompare)).toBeFalsy();
      });
    });
  });
});
