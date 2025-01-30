# Consigne
- Rédiger le cas d'utilisation dans le fichier `src\hexagon\use-cases\user\update-user\UpdateUser.ts` et le tester dans le fichier adjacent
- Modifier l'API `update` du fichier `src\adapters\primary\koa\controllers\user\UserController.ts` et implémenter le test manquant dans le fichier adjacent

## Bonus
- Des commentaires sous la forme de `BONUS : ????` se sont cachés dans le code. Lister ci-dessous les mots par ordre de lecture lors d'un appel API en succès de UserController.update (astuce: ctrl + shift + f pour recherche "BONUS" dans l'ensemble du projet):

# Informations
- Le InMemoryUserRepository simule une base de données
- Le UserRepositoryStub permet d'abstraire la base de données pour les tests (équivalent au mock)