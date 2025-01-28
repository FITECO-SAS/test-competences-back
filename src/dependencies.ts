import { DotEnvConfigProvider } from "@secondary/gateways/config-provider/dot-env/DotEnvConfigProvider";
import { FnsDateManager } from "@secondary/gateways/date-manager/fns/FnsDateManager";
import { DateProviderStub } from "@secondary/gateways/date-provider/DateProviderStub";
import { SystemDateProvider } from "@secondary/gateways/date-provider/system/SystemDateProvider";
import { ConsoleLogProvider } from "@secondary/gateways/log-provider/console/ConsoleLogProvider";
import { LogProviderStub } from "@secondary/gateways/log-provider/LogProviderStub";
import { InternalPayloadValidator } from "@secondary/gateways/payload-validator/internal/InternalPayloadValidator";
import { InMemoryUserRepository } from "@secondary/repositories/user/in-memory/InMemoryUserRepository";

const isTest = process.env.NODE_ENV === 'test';
const isProduction = process.env.NODE_ENV === 'production';

const config = new DotEnvConfigProvider(isTest ? '.env.test' : '.env').get();

const payloadValidator = new InternalPayloadValidator();
const dateProvider = isTest ? new DateProviderStub() : new SystemDateProvider();
const dateManager = new FnsDateManager();
const logProvider = isTest ? new LogProviderStub() : new ConsoleLogProvider(dateProvider, dateManager);
const userRepository = new InMemoryUserRepository();

export const dependencies = {
  isTest,
  isProduction,
  config,

  dateProvider,
  dateManager,
  logProvider,
  payloadValidator,
  userRepository
};
