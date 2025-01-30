import 'module-alias/register';
import '@myfiteco/prototypes';
import { dependencies } from '@dependencies';
import { App } from '@primary/koa/App';
import { controllers } from '@primary/koa/controllers';

const run = async () => {
  // BONUS : ABRICOT
  const app = new App(controllers);
  await app.initServer();
  app.listen(dependencies.config.port);
};

run().catch((e) => console.log(typeof e === 'string' ? e.red : e.stack.red));
