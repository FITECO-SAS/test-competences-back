import { DefaultContext, ExtendableContext, Request } from 'koa';
import { ParsedUrlQuery } from 'querystring';

interface RouteDefinition {
  query?: unknown
  params?: unknown
  body?: unknown
}
export interface Context<T extends RouteDefinition = DefaultContext> extends ExtendableContext {
  query: ParsedUrlQuery & T['query']
  params: T['params']
  request: Omit<Request, 'body'> & { body: T['body'] }
  body: unknown
}
