import { getApi } from "@test/getApi";
import { UserController } from "./UserController";

const api = getApi(UserController);

describe('Modification de l\'utilisateur', () => {
  describe('Vérification des données en entrée', () => {
    test('Doit recevoir les champs requis', async () => {
      const response = await api.put('/users/1')
      .send({})
      .expect(422);

      expect(response.body.details).toEqual({
        firstname: expect.objectContaining({
          type: 'any.required'
        }),
        lastname: expect.objectContaining({
          type: 'any.required'
        }),
      });
    });

    test('Doit recevoir un id au format nombre', async () => {
      const response = await api.put('/users/invalid')
      .send({
        firstname: 'John',
        lastname: 'Doe',
      })
      .expect(422);

      expect(response.body.details).toEqual({
        id: expect.objectContaining({
          type: 'number.type'
        }),
      });
    });
  });

  /**
   * TODO : 
   * - Vérifier que le use-case est appelé avec les bonnes données
   * - Vérifier la réponse de l'API
   */
  test.todo('Doit modifier un utilisateur');
})