import { DateManager } from "@hexagon/gateways/DateManager";

export class DateManagerStub implements DateManager {
  private _addedYears: Record<string, Date> | null = null;
  private _addedMonths: Record<string, Date> | null = null;
  private _addedDays: Record<string, Date> | null = null;
  private _addedHours: Record<string, Date> | null = null;
  private _subtractedYears: Record<string, Date> | null = null;
  private _subtractedMonths: Record<string, Date> | null = null;
  private _isBeforeData: Record<string, boolean> = {};

  public formatAsDate(date: Date) {
    return `formatAsDate-${date.toISOString()}`;
  }

  public formatAsDashDate(date: Date) {
    return `formatAsDashDate-${date.toISOString()}`;
  }

  public formatAsFrenchDate(date: Date) {
    return `formatAsFrenchDate-${date.toISOString()}`;
  }

  public formatAsDateDigits(date: Date) {
    return `formatAsDateDigits-${date.toISOString()}`;
  }

  public formatAsDateTime(date: Date) {
    return `formatAsDateTime-${date.toISOString()}`;
  }

  public formatAsYearMonth(date: Date) {
    return `formatAsYearMonth-${date.toISOString()}`;
  }

  public formatAsMonthYear(date: Date) {
    return `formatAsMonthYear-${date.toISOString()}`;
  }

  public addYears(date: Date, years: number) {
    return this._addedYears![`${date.toISOString()}-${years}`];
  }

  public addMonths(date: Date, days: number) {
    return this._addedMonths![`${date.toISOString()}-${days}`];
  }

  public addDays(date: Date, days: number) {
    return this._addedDays![`${date.toISOString()}-${days}`];
  }

  public addHours(date: Date, hours: number) {
    return this._addedHours![`${date.toISOString()}-${hours}`];
  }

  public subtractYears(date: Date, years: number) {
    return this._subtractedYears![`${date.toISOString()}-${years}`];
  }

  public subtractMonths(date: Date, months: number) {
    return this._subtractedMonths![`${date.toISOString()}-${months}`];
  }

  public endOfMonth(): Date {
    throw new Error('Method not implemented.');
  }

  public isBefore(date: Date, dateToCompare: Date) {
    return this._isBeforeData[`${date.toISOString()}-${dateToCompare.toISOString()}`];
  }

  public isAfter(): boolean {
    throw new Error('Method not implemented.');
  }

  public set addedYears(addedYears: Record<string, Date>) {
    this._addedYears = addedYears;
  }

  public set addedHours(addedHours: Record<string, Date>) {
    this._addedHours = addedHours;
  }

  public set addedDays(addedDays: Record<string, Date>) {
    this._addedDays = addedDays;
  }

  public set subtractedYears(subtractedYears: Record<string, Date>) {
    this._subtractedYears = subtractedYears;
  }

  public set subtractedMonths(subtractedMonths: Record<string, Date>) {
    this._subtractedMonths = subtractedMonths;
  }

  public set isBeforeData(isBeforeData: Record<string, boolean>) {
    this._isBeforeData = isBeforeData;
  }
}
