import { DateManager } from '@hexagon/gateways/DateManager';
import { addDays, addHours, addMonths, addYears, endOfMonth, format, isAfter, isBefore, subMonths, subYears } from 'date-fns';

export class FnsDateManager implements DateManager {
  public formatAsDate(date: Date) {
    return format(date, 'yyyy/MM/dd');
  }

  public formatAsFrenchDate(date: Date) {
    return format(date, 'dd/MM/yyyy');
  }

  public formatAsDashDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }

  public formatAsDateDigits(date: Date) {
    return format(date, 'yyyyMMdd');
  }

  public formatAsDateTime(date: Date) {
    return format(date, 'yyyy/MM/dd-HH:mm:ss');
  }

  public formatAsYearMonth(date: Date) {
    return format(date, 'yyyy/MM');
  }

  public formatAsMonthYear(date: Date) {
    return format(date, 'MM/yyyy');
  }

  public addYears(date: Date, years: number) {
    return addYears(date, years);
  }

  public addMonths(date: Date, months: number) {
    return addMonths(date, months);
  }

  public addDays(date: Date, days: number) {
    return addDays(date, days);
  }

  public addHours(date: Date, hours: number) {
    return addHours(date, hours);
  }

  public subtractYears(date: Date, years: number) {
    return subYears(date, years);
  }

  public subtractMonths(date: Date, months: number) {
    return subMonths(date, months);
  }

  public endOfMonth(date: Date) {
    return endOfMonth(date);
  }

  public isBefore(date: Date, dateToCompare: Date) {
    return isBefore(date, dateToCompare);
  }

  public isAfter(date: Date, dateToCompare: Date) {
    return isAfter(date, dateToCompare);
  }
}
