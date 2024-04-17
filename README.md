<div align="center">
    <h1>fastify-typescript-prisma-boilerplate</h1>
    <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-5.3-blue" />
    <img alt="NodeJS" src="https://img.shields.io/badge/NodeJS%3E%3D-16-darkgreen" />
    <img alt="License" src="https://img.shields.io/badge/License-APLv2-magenta" />
    <a href="https://github.com/CyrilDesch/fastify-typescript-prisma-boilerplate/actions/workflows/deploy.yml">
        <img alt="CI/CD status" src="https://github.com/CyrilDesch/fastify-typescript-prisma-boilerplate/actions/workflows/deploy.yml/badge.svg" />
    </a>
</div>

<br />

<div align="center">
    <strong><sup>Project Highlights</sup></strong>
    <br />
    <span>• Request validation with schema <a href="https://github.com/sinclairzx81/typebox">Typebox</a></span>
    <br />
    <span>• <a href="https://www.prisma.io">Prisma</a> as ORM</span>
    <br />
    <span>• Efficient error handling and logger</span>
    <br />
    <span>• Routes guard with middleware equivalent</span>
</div>

<br />
<hr />
<br />

<div align="center">
    <sub>👩🏻‍💻 <strong>Developer Ready:</strong> </sub>
    <p>A comprehensive template. Followed <strong>strict</strong> and <strong>REST guidelines</strong></p>
    <sub>💼 <strong>Ready for production:</strong></sub>
    <p>Built-in <a href="https://github.com/features/actions">GitHub Actions</a> script to check <strong>linter</strong> and <strong>deploy</strong>. Dockerfile already configurated. See below how to use secrets.</p>
    <sub>🎁 <strong>Opensource:</strong></sub>
    <p>Available under the APLv2 license.</p>
</div>

<br />
<hr />
<br />

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
- **CI/CD :** [GitHub Actions](https://github.com/features/actions) + Docker

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

### General secret

| Variable          | Description                                            | Exemple                                      |
| ----------------- | ------------------------------------------------------ | -------------------------------------------- |
| `APP_SECRET`      | The secret used for the cookies (32 chars recommended) | `U£,rGtD~Fm;1TY9!Zmpz&R7q&0Sdz@2H`           |
| `APP_CORS_ORIGIN` | List of the CORS in the shape                          | `http://localhost,https://cyrildeschamps.fr` |

### For each environment

#### Development

| Variable                              | Description                                                  | Example                                                  |
| ------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `DEVELOPMENT_APP_BACKEND_PUBLIC_URL`  | HTTP API address                                             | `https://boilerplate.cyrildeschamps.fr`                  |
| `DEVELOPMENT_APP_FRONTEND_PUBLIC_URL` | Web application address                                      | `https://boilerplate.cyrildeschamps.fr`                  |
| `DEVELOPMENT_APP_DATABASE_URL`        | Database URL                                                 | `mysql://user:password@hostname:ip/dbname?schema=public` |
| `DEVELOPMENT_HOST`                    | Deployment server IP                                         | `66.254.114.41`                                          |
| `DEVELOPMENT_PORT`                    | Deployment server SSH port                                   | `22`                                                     |
| `DEVELOPMENT_SSHKEY`                  | SSH key for connecting to the server                         | See server's `.ssh/id_...` file                          |
| `DEVELOPMENT_USERNAME`                | Username for connecting to the server                        | `debian`                                                 |
| `DEVELOPMENT_DOCKER_IMAGES_PATH`      | Name of the folder where the project is stored on the server | `/home/debian/docker-container-images`                   |
| `DEVELOPMENT_DOCKER_LOCAL_IP`         | Local IP (nginx) of the container                            | `172.0.0.18`                                             |

#### Production

| Variable                             | Description                                                  | Example                                                  |
| ------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| `PRODUCTION_APP_BACKEND_PUBLIC_URL`  | HTTP API address                                             | `https://cyrildeschamps.fr`                              |
| `PRODUCTION_APP_FRONTEND_PUBLIC_URL` | Web application address                                      | `https://cyrildeschamps.fr`                              |
| `PRODUCTION_APP_DATABASE_URL`        | Database URL                                                 | `mysql://user:password@hostname:ip/dbname?schema=public` |
| `PRODUCTION_HOST`                    | Deployment server IP                                         | `66.254.114.41`                                          |
| `PRODUCTION_PORT`                    | Deployment server SSH port                                   | `22`                                                     |
| `PRODUCTION_SSHKEY`                  | SSH key for connecting to the server                         | See server's `.ssh/id_...` file                          |
| `PRODUCTION_USERNAME`                | Username for connecting to the server                        | `debian`                                                 |
| `PRODUCTION_DOCKER_IMAGES_PATH`      | Name of the folder where the project is stored on the server | `/home/debian/docker-container-images`                   |
| `PRODUCTION_DOCKER_LOCAL_IP`         | Local IP (nginx) of the container                            | `172.0.0.19`                                             |

## Support

You can support this project by contributing to it, by posting issues and proposing pull request.

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE) file for details.

## Improvements

- Use github environment to store secrets and maybe reduce the number of secrets
- Add testing with Jest or other
- Auto-tagging with semantic-release
- Manage migration file between tags or environment)
- And, all others improvements are welcome...
