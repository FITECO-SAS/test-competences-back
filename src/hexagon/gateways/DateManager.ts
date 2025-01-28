export interface DateManager {
  /**
   * Envoie la date au format `YYYY/MM/DD`.
   * @param date Date
   */
  formatAsDate(date: Date): string

  /**
   * Envoie la date au format `YYYY-MM-DD`.
   * @param date Date
   */
  formatAsDashDate(date: Date): string

  /**
   * Envoie la date au format `DD/MM/YYYY`.
   * @param date Date
   */
  formatAsFrenchDate(date: Date): string

  /**
   * Envoie la date au format `YYYYMMDD`.
   * @param date Date
   */
  formatAsDateDigits(date: Date): string

  /**
   * Envoie la date au format `YYYY/MM/DD-HH:mm:ss`.
   * @param date Date
   */
  formatAsDateTime(date: Date): string

  /**
   * Envoie la date au format `YYYY/MM`.
   * @param date Date
   */
  formatAsYearMonth(date: Date): string

  /**
   * Envoie la date au format `MM/YYYY`.
   * @param date Date
   */
  formatAsMonthYear(date: Date): string

  /**
   * Ajoute un nombre d'années à une date.
   * @param date Date
   * @param years Années
   */
  addYears(date: Date, years: number): Date

  /**
   * Ajoute un nombre de mois à une date.
   * @param date Date
   * @param months Mois
   */
  addMonths(date: Date, months: number): Date

  /**
   * Ajoute un nombre de jours à une date.
   * @param date Date
   * @param days Jours
   */
  addDays(date: Date, days: number): Date

  /**
   * Ajoute un nombre d'heures à une date.
   * @param date Date
   * @param hours Heures
   */
  addHours(date: Date, hours: number): Date

  /**
   * Soustrait un nombre d'années à une date.
   * @param date Date
   * @param years Années
   */
  subtractYears(date: Date, years: number): Date

  /**
   * Soustrait un nombre de mois à une date.
   * @param date Date
   * @param months Mois
   */
  subtractMonths(date: Date, months: number): Date

  /**
   * Défini le jour sur le dernier du mois.
   * @param date Date
   */
  endOfMonth: (date: Date) => Date

  /**
   * Compare si une date est avant une autre date.
   * @param date Date
   * @param dateToCompare Date à comparer
   */
  isBefore: (date: Date, dateToCompare: Date) => boolean

  /**
   * Compare si une date est après une autre date.
   * @param date Date
   * @param dateToCompare Date à comparer
   */
  isAfter: (date: Date, dateToCompare: Date) => boolean
}
