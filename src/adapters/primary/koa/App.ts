import { App as BaseApp, KoaRouter, Middleware } from '@myfiteco/koa-router';
import { BaseValidator, RequestValidator } from '@myfiteco/validator';
import { dependencies } from '@dependencies';
import { CheckPayloadMiddleware } from './middlewares/check-payload/CheckPayloadMiddleware';
import { ExceptionHandlerMiddleware } from './middlewares/exception-handler/ExceptionHandlerMiddleware';

KoaRouter.init({
  port: dependencies.config.port,
  swagger: {
    title: 'Mya',
  },
  authentications: {
    public: null
  }
});

export class App extends BaseApp {
  public constructor(private readonly _controllers: Array<any>) {
    super();
  }

  public async initServer() {
    this.config({
      helmet: {
        contentSecurityPolicy: false,
        frameguard: false,
      },
    });
    this.initControllers();
  }

  public initControllers() {
    super.initControllers({
      controllers: this._controllers,
      getDocumentations: (validate) => RequestValidator.getDocumentation(validate as Array<BaseValidator>),
      callback: ({ actionName, controllerName, controllerOptions, route }) => {
        const middlewares: Array<Middleware> = [
          new ExceptionHandlerMiddleware(controllerName, actionName),
        ];

        if (route.options.validate?.length) {
          middlewares.push(new CheckPayloadMiddleware(route.options.validate as Array<BaseValidator>));
        }

        return middlewares;
      },
    });
  }
}
