# flutterapi
REST API used in a project of Flutter application


## AdonisJS

To make this application we gonna use the AdonisJS Framework.
Everything can be found in (here)[https://adonisjs.com/docs/4.1/installation]

## Install
```console
    npm i -g @adonisjs/cli
```
and then
```console
    adonis new flutterapi --api-only
```

# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### mySQL

```console
    npm install mysql
```

### configuration

```console
    adonis migration:run
```

### controllers and JWT

Create controller to User, Session and Login

```console
    adonis make:controller <controllerName> --type http 
```

### models and migrations

```console
    adonis make: model <ModelName> -m -c (migration e controller)
```

