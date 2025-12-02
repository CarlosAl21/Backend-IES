<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Backend-IES

Proyecto backend construido con NestJS para la gestión de entidades relacionadas a créditos, inversiones y usuarios. Incluye autenticación JWT, subida de imágenes a Cloudinary y persistencia con TypeORM (MySQL).

## Descripción

Este repositorio contiene la API del proyecto IES (Institución Educativa / Institución Financiera — según contexto del curso). Proporciona endpoints para:

- Gestión de usuarios (registro, login, actualización)
- Gestión de créditos
- Gestión de inversiones
- Solicitudes de inversión
- Integración con Cloudinary para gestión de archivos
- Autenticación y autorización basada en JWT y roles

## Estructura de carpetas

El árbol principal de la aplicación es:

```
src/
  app.controller.ts
  app.module.ts
  app.service.ts
  data-source.ts
  main.ts
  swagger.ts
  auth/
    auth.controller.ts
    auth.module.ts
    auth.service.ts
    jwt-auth.guard.ts
    jwt.strategy.ts
    roles.decorator.ts
    roles.guard.ts
    dto/
      login.dto.ts
      reset-password.dto.ts
  cloudinary/
    cloudinary.module.ts
    cloudinary.provider.ts
    cloudinary.service.ts
    cloudinary-response.ts
  creditos/
    creditos.controller.ts
    creditos.module.ts
    creditos.service.ts
    dto/
      create-credito.dto.ts
      update-credito.dto.ts
    entities/
      credito.entity.ts
  institucion-financiera/
    institucion-financiera.controller.ts
    institucion-financiera.module.ts
    institucion-financiera.service.ts
    dto/
      create-institucion-financiera.dto.ts
      update-institucion-financiera.dto.ts
    entities/
      institucion-financiera.entity.ts
  inversiones/
    inversiones.controller.ts
    inversiones.module.ts
    inversiones.service.ts
    dto/
      create-inversione.dto.ts
      update-inversione.dto.ts
    entities/
      inversione.entity.ts
  solicitudes-inversion/
    solicitudes-inversion.controller.ts
    solicitudes-inversion.module.ts
    solicitudes-inversion.service.ts
    dto/
      create-solicitudes-inversion.dto.ts
      update-solicitudes-inversion.dto.ts
    entities/
      solicitudes-inversion.entity.ts
  user/
    user.controller.ts
    user.module.ts
    user.service.ts
    dto/
      create-user.dto.ts
      update-user.dto.ts
    entities/
      user.entity.ts
test/
  app.e2e-spec.ts
  jest-e2e.json
```

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- MySQL (u otra base compatible con TypeORM) o configuración de datasource acorde

## Instalación

1. Clonar el repositorio:

```bash
git clone <repo-url>
cd Backend-IES
```

2. Instalar dependencias:

```powershell
npm install
```

3. Configurar variables de entorno / datasource:

- Editar `src/data-source.ts` o crear un archivo de configuración de entorno con los parámetros de conexión a la base de datos (host, usuario, contraseña, nombre de BD).
- Configurar `JWT_SECRET` y otros secretos que use la aplicación.

## Dependencias principales

- Framework: `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`
- Base de datos y ORM: `typeorm`, `@nestjs/typeorm`, `mysql`
- Autenticación: `@nestjs/jwt`, `passport`, `passport-jwt`, `@nestjs/passport`
- Validación: `class-validator`
- Subida/almacenamiento: `cloudinary`, `streamifier`
- Documentación API: `@nestjs/swagger`, `swagger-ui-express`

DevDependencies principales:

- `typescript`, `ts-node`, `jest`, `ts-jest`, `eslint`, `prettier`

Para ver la lista completa de dependencias consulte `package.json`.

## Scripts disponibles

Comandos útiles definidos en `package.json`:

```powershell
npm run start        # ejecuta la app en producción (con dist previa)
npm run start:dev    # modo desarrollo con watch
npm run start:prod   # ejecuta desde dist (producción)
npm run build        # compila TypeScript
npm run test         # ejecuta tests unitarios
npm run test:e2e     # ejecuta tests e2e
npm run test:cov     # coverage
npm run lint         # ejecuta eslint y arregla problemas
npm run format       # formatea con prettier
```

Ejemplo: para desarrollo

```powershell
npm install
npm run start:dev
```

## Ejecución local rápida

1. Levantar la base de datos (MySQL) y crear la BD indicada en `data-source.ts`.
2. Ejecutar `npm install`.
3. Ejecutar `npm run start:dev` y abrir `http://localhost:3000`.

La documentación Swagger (si está configurada) suele estar en `http://localhost:3000/api` o según `swagger.ts`.

## Contribuir

- Abrir issues o PRs para bugs o mejoras.
- Seguir las convenciones de lint y formateo antes de push.

## Contacto

Para dudas, escribe al mantenedor del repositorio o abre un issue.
