import dotenv from 'dotenv';
import { ConfigProvider } from '@hexagon/gateways/ConfigProvider';
import { SystemConfig } from '@secondary/models/SystemConfig';

const KEYS = [
  'PORT',
] as const;

type Key = typeof KEYS[number];

export class DotEnvConfigProvider implements ConfigProvider {
  private _config: SystemConfig;
  private _path: string;

  public constructor(path: string) {
    this._path = path;
    this._config = this.load();
  }

  public get() {
    return this._config;
  }

  private load() {
    dotenv.config({ path: this._path, override: true });

    this.assertNotEmptyValues();

    const config: SystemConfig = {
      port: this.getNumber('PORT'),
    };

    return config;
  }

  private assertNotEmptyValues() {
    KEYS.forEach((key) => {
      if (!this.getString(key)) throw this.getEmptyKeyError(key);
    });
  }

  private getString(key: Key) {
    return process.env[key] as string;
  }

  private getNumber(key: Key) {
    const value = Number(this.getString(key));
    if (Number.isNaN(value)) throw this.getInvalidKeyError(key);
    return value;
  }

  private getEmptyKeyError(key: Key) {
    return new Error(`Empty ${key} value in ${this._path}.`);
  }

  private getInvalidKeyError(key: Key) {
    return new Error(`Invalid ${key} value in ${this._path}.`);
  }
}
