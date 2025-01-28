import * as http from 'http';
import request from 'supertest';
import { App } from '@primary/koa/App';
import { controllers } from '@primary/koa/controllers';

type Controller = typeof controllers[number];

/**
 * Envoie l'API.
 * @param controller Controller du test e2e.
 */
export const getApi = (controller: Controller) => {
  const app = new App([controller]);
  app.initServer();
  return request(http.createServer(app.app.callback()));
};
