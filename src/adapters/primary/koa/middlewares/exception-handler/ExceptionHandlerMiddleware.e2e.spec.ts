import { Context } from '@myfiteco/koa-router';
import { dependencies } from '@dependencies';
import { LogProviderStub } from '@secondary/gateways/log-provider/LogProviderStub';
import { ExceptionHandlerMiddleware } from './ExceptionHandlerMiddleware';

describe('Interception des exceptions par un middleware Koa', () => {
  test('Doit renvoyer une réponse json', async () => {
    const logProvider = dependencies.logProvider as LogProviderStub;
    const exceptionHandlerMiddleware = new ExceptionHandlerMiddleware('controller', 'action');

    const ctx: Context = {
      request: {
        path: '/test',
        method: 'get',
      },
      state: {},
    } as unknown as Context;

    const next = () => {
      throw new Error('une erreur');
    };

    await exceptionHandlerMiddleware.handle(ctx, next);
    expect(ctx.status).toEqual(500);
    expect(ctx.body).toEqual({
      type: 'unknown_error',
      message: 'Une erreur est survenue.',
    });
    expect(logProvider.errorParams).toEqual([
      { message: '[500] → GET /test (controller.action)' },
    ]);
    expect(ctx.state.error).toEqual({
      className: 'Error',
      message: 'Une erreur est survenue.',
      stackTrace: ctx.state.error.stackTrace,
    });
  });
});
