# fastify-typescript-prisma-boilerplate

![Typescript](https://img.shields.io/badge/TypeScript-5.3-blue)
![NodeJS](https://img.shields.io/badge/NodeJS>=-16-darkgreen)
![License](https://img.shields.io/badge/License-APLv2-magenta)
![](https://github.com/Cyril-Deschamps/fastify-typescript-prisma-boilerplate/actions/workflows/deploy.yml/badge.svg)

👩🏻‍💻 Developer Ready: A comprehensive template. Followed strict and REST guidelines

💼 Ready for production: built-in [GitHub Actions][gh-actions] script to check linter and deploy. Dockerfile already configurated [(see server-documentation.md)](./server-documentation.md)

🎁 Free : available under the APLv2 license.

## Features

- **Execution environment :** Node 16 with ESM and Yarn
- **Framework :** [Fastify](https://fastify.dev/docs/latest/)
- **Language :** [TypeScript 5.3](https://www.typescriptlang.org/)
- **ORM :** [Prisma](https://www.prisma.io)
- **Schema validator :** [Typebox](https://github.com/sinclairzx81/typebox)
- **Security :** jsonwebtoken and bcrypt
- **Format :** [Prettier](https://prettier.io/) to enforce consistent code style
- **Linter :** [ESLint](https://eslint.org/) with good practices of clean code
- **GIT Helper :** Husky + Commitlint + Commitizen
- **CI/CD :** [GitHub Actions](https://github.com/features/actions)

## Getting started

The project required Node.js v16 or later.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/Cyril-Deschamps/fastify-typescript-prisma-boilerplate.git
mv fastify-typescript-prisma-boilerplate your-project-name
cd your-project-name
yarn install
```

### Available Scripts

- `watch` - start project in dev mode with hot reload,
- `start` - start JS Project,
- `build` - transpile TypeScript to ES6,
- `prepare` - to install husky hooks,
- `migrate` - migrate Prisma schema to remote database,
- `npm-run-all lint-check:\*` - Process eslint and prettier checks,
- `npm-run-all lint-fix:\*` - Process eslint, prettier checks and try to resolve,

## Secrets

Secrets are stored in github secrets. For a local environment, you can use the `.env` file to store the secret (see .env.example).

### General secret :

- APP_SECRET : The secret used for the cookies (32 chars recommended)
- APP_CORS_ORIGIN : List of the CORS in the shape `http://localhost,http://cyrildeschamps.fr`

### For each environment (DEVELOPMENT, PRODUCTION):

- (DEVELOPMENT | STAGING | PRODUCTION)\_APP_BACKEND_PUBLIC_URL : HTTP API address (example: https://cyrildeschamps.fr)
- (DEVELOPMENT | STAGING | PRODUCTION)\_APP_FRONTEND_PUBLIC_URL : Web application address (example: https://toptenpro.fr)
- (DEVELOPMENT | STAGING | PRODUCTION)\_APP_DATABASE_URL : Database URL (e.g. `mysql://user:password@hostname:ip/dbname?schema=public`)
- (DEVELOPMENT | STAGING | PRODUCTION)\_HOST : Deployment server IP
- (DEVELOPMENT | STAGING | PRODUCTION)\_PORT : Deployment server SSH port (example: 22)
- (DEVELOPMENT | STAGING | PRODUCTION)\_SSHKEY : SSH key for connecting to the server (see server's .ssh/id\_... file)
- (DEVELOPMENT | STAGING | PRODUCTION)\_USERNAME : Username for connecting to the server (example: debian)
- (DEVELOPMENT | STAGING | PRODUCTION)\_DOCKER_IMAGES_PATH : Name of the folder where the project is stored on the server (example: /home/debian/docker-container-images)

## Support

You can support this project by contributing to it, by posting issues and proposing pull request.

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE) file for details.
