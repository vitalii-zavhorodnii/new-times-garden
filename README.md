## Setting up repo

Repo contains workspaces in /apps/

### Installing environment

Set .env file from .env.example template

```sh
yarn
```

### Development mode

Repo has few commands for each module: sass and client, api for backend

```sh
yarn client
yarn sass
yarn api
```

### Build mode

Build mode runs build api (backend), then creates client, on server it will be moved into api folder 'static' and serves 'index.html'

```sh
yarn build:client
yarn build:api
```

## Repository settings

For auto-deploy on server, add to github.com repository settings secrets

* `SSH_PRIVATE_KEY`: private key from server ssh keygen, *Private key
* `SSH_HOST`: server ip / domain
* `SSH_USER`: serever login user (dev, root...)

# Phaser esbuild TypeScript Template

This is a Phaser 3 project template that uses esbuild for bundling. It supports hot-reloading for quick development workflow, includes TypeScript support and scripts to generate production-ready builds.

**[This Template is also available as a JavaScript version.](https://github.com/phaserjs/template-esbuild)**

### Versions

This template has been updated for:

- [Phaser 3.80.1](https://github.com/phaserjs/phaser)
- [esbuild 0.20.1](https://github.com/evanw/esbuild)
- [TypeScript 5.3.3](https://github.com/microsoft/TypeScript)

![screenshot](screenshot.png)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Launch a development web server |
| `npm run build` | Create a production build in the `dist` folder |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm run dev`.

The local development server runs on `http://localhost:8080` by default. Please see the esbuild documentation if you wish to change this, or add SSL support.

Once the server is running you can edit any of the files in the `src` folder. esbuild will automatically recompile your code and then reload the browser.

## Template Project Structure

We have provided a default project structure to get you started. This is as follows:

- `public/index.html` - A basic HTML page to contain the game.
- `src` - Contains the game source code.
- `src/main.ts` - The main entry point. This contains the game configuration and starts the game.
- `src/scenes/` - The Phaser Scenes are in this folder.
- `src/global.d.ts` - Global TypeScript declarations, provide types information.
- `public/style.css` - Some simple CSS rules to help with page layout.
- `public/assets` - Contains the static assets used by the game.

## Deploying to Production

After you run the `npm run build` command, your code will be built into a single bundle and saved to the `dist` folder, along with any other assets your project imported, or stored in the public assets folder.

In order to deploy your game, you will need to upload *all* of the contents of the `dist` folder to a public facing web server.

## Customizing the Template

### esbuild

If you want to customize your build, such as adding plugin (i.e. for loading CSS or fonts), you can modify the `esbuild/build.prod.mjs` and `esbuild/dev.server.mjs` files for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json`. Please see the [esbuild documentation](https://esbuild.github.io/api/) for more information.
