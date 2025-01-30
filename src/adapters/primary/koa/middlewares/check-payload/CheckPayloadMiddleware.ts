import { Context, Middleware, Next } from '@myfiteco/koa-router';
import { BaseValidator, Location } from '@myfiteco/validator';
import { dependencies } from '@dependencies';
import { UnprocessableEntityException } from '@hexagon/exceptions/http/UnprocessableEntityException';
import { InvalidPayloadException } from '@hexagon/exceptions/payload/InvalidPayloadException';
import { CheckPayload } from '@hexagon/use-cases/check-payload/CheckPayload';

export class CheckPayloadMiddleware extends Middleware {
  public constructor(private readonly _validations: Array<BaseValidator>) {
    super();
  }

  public async handle(ctx: Context, next: Next) {
    ctx.request.params = { ...ctx.params };
    const checkPayload = new CheckPayload(dependencies.payloadValidator);
    const bodyErrors = await this.check(checkPayload, 'body', ctx.request.body);
    const pathErrors = await this.check(checkPayload, 'path', ctx.request.params);
    const queryErrors = await this.check(checkPayload, 'query', ctx.query);

    if (bodyErrors || pathErrors || queryErrors) {
      throw new UnprocessableEntityException({
        ...bodyErrors?.errors,
        ...pathErrors?.errors,
        ...queryErrors?.errors,
      });
    }

    // BONUS : ANANAS
    await next();
    // BONUS : TAMARIN
  }

  private async check(checkPayload: CheckPayload, location: Location, payload: Record<string, any> | undefined) {
    const validations = this._validations.filter((validation) => validation.location === location);
    return checkPayload.execute(validations, payload || {}).catch((e) => e as InvalidPayloadException);
  }
}
