import { Context, Controller, Get, Put } from '@myfiteco/koa-router';
import { dependencies } from '@dependencies';
import { UserUpdateContext, userValidation } from '@primary/koa/validation/userValidation';
import { UpdateUser } from '@hexagon/use-cases/user/update-user/UpdateUser';

@Controller({
  path: '/users',
  description: 'Utilisateurs',
  authentification: 'public',
})
export class UserController {
  @Put({
    path: '/:id',
    description: 'Modification des utilisateurs',
    validate: userValidation.update,
  })
  public async update(ctx: UserUpdateContext): Promise<void> {
    /**
     * TODO : Brancher le cas d'utilisation
     * ctx.request.params contient les paramètres de l'url
     * ctx.request.body contient le corps de la requête
     */
    const updateUser = new UpdateUser();
    ctx.body = updateUser.execute();
  }
}
