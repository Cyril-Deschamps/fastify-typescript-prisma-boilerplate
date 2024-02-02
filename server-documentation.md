# Full project documentation (FR pour client)

## Mise en place serveur :

- Installation de docker
- Création d'un network docker "reverse-proxy"
- Création d'un docker Nginx et MariaDB
- Création d'une configuration nginx pour le reverse-proxy et le lien avec la BDD
- Création d'une configuration nginx pour le projet toptenpro (HTTP et HTTPS)
- Auto génération des certificats pour SSL avec Letsencrypt et Certbot
- Création d'un script github action pour le déploiement continu sur le repo github du projet
- Configuration des secrets en fonction du serveur de déploiement [(voir README.md)](./README.md)

**Le script github action doit pouvoir** :

- Intégrer les secrets dans le fichier .env
- L'envoyer sur le serveur
- Build l'image docker
- Supprimer l'ancien docker et lancer le nouveau

## Déploiement continu

Le déploiement continu se fait via Github Actions grâce au script ".github/workflows/deploy.yml". Il est déclenché à chaque push sur la branche development | production.

Les secrets Github sont utilisés pour la connexion SSH au serveur, et peuvent donc être modifié facilement. On y stocke également les variables d'environnement qui sont ajoutés dans le fichier ".env" lors du build par le script de déploiement. [Voir README.md](./README.md) pour plus de détails sur les secrets.

## Déploiement et technos

- Gestion GIT

  - Importer le projet

    ```bash
    git clone https://github.com/Cyril-Deschamps/toptenpro-front.git
    git checkout development

    # La seconde commande permet de se placer
    # dans la branche (=version) "development".
    ```

  - Envoyer les modifications
    ```bash
    git add .
    git commit -m "feat|fix: (phrase désignant la/les modification(s))"
    git push
    ```
  - Déployer les modifications
    - Se rendre à l’adresse :
      - FRONT : https://github.com/Cyril-Deschamps/toptenpro-front/compare/production...development?expand=1
      - BACK : https://github.com/Cyril-Deschamps/toptenpro-back/compare/production...development?expand=1
    - Créer la pull request
    - A ce stade là, vous pouvez vérifier vos modifications; que vous n’envoyer pas d’erreur qui pourrait causer un crash.
    - Si tout est bon, merger la pull request.
    - Le déploiement se lancer tout seul, durée d’environ 5 minutes. Vous pouvez vérifier l’état dans l’onglet Actions.
      - Le jaune signifie “en cours”
      - Le vert signifie terminé avec succès
      - Le rouge signifie “Appeler Cyril car il y a un problème”

- Technos
  - API : NodeJS (Fastify + ORM Prisma) - Flux HTTP
  - BDD : MariaDB
  - Reverse-proxy : NGINX
