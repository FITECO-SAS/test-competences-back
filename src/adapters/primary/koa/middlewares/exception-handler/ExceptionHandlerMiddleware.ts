import { Context, Middleware, Next } from '@myfiteco/koa-router';
import { dependencies } from '@dependencies';
import { HandleException } from '@hexagon/use-cases/handle-exception/HandleException';

export class ExceptionHandlerMiddleware extends Middleware {
  public constructor(
    private readonly _controller: string,
    private readonly _action: string,
  ) {
    super();
  }

  public async handle(ctx: Context, next: Next) {
    const handleException = new HandleException(dependencies.logProvider);

    const result = await handleException.execute(
      {
        action: this._action,
        controller: this._controller,
        method: ctx.request.method,
        path: ctx.request.path,
        body: ctx.request.body,
        query: ctx.query,
      },
      next,
    );

    if (result) {
      ctx.state.error = {
        className: result.className,
        message: result.response.content.message,
        stackTrace: result.stackTrace,
      };
      ctx.status = result.response.status;
      ctx.body = result.response.content;
    }
  }
}
