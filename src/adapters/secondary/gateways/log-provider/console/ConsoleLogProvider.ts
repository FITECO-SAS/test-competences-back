import { DateManager } from '@hexagon/gateways/DateManager';
import { DateProvider } from '@hexagon/gateways/DateProvider';
import { LogProvider } from '@hexagon/gateways/LogProvider';

export class ConsoleLogProvider implements LogProvider {
  public constructor(
    private readonly _dateProvider: DateProvider,
    private readonly _dateManager: DateManager,
  ) {}

  public info(message: string) {
    console.info(`[${this.getDate()}] ${message}`.cyan);
  }

  public error(message: string) {
    console.error(`[${this.getDate()}] ${message}`.red);
  }

  private getDate() {
    return this._dateManager.formatAsDateTime(this._dateProvider.now());
  }
}
