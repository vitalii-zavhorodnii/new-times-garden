## Setting up repo

Repo contains workspaces in /apps/

### Installing environment

Set .env file from .env.example template

```sh
npm install
```

### Development mode

Repo has few commands for each module: sass and client, api for backend

```sh
npm run client
npm run sass
npm run api
```

### Build mode

Build mode runs build api (backend), then creates client, on server it will be moved into api folder 'static' and serves 'index.html'

```sh
npm run build:client
npm run build:api
```

## Repository settings

For auto-deploy on server, add to github.com repository settings secrets

* `SSH_PRIVATE_KEY`: private key from server ssh keygen, *Private key
* `SSH_HOST`: server ip / domain
* `SSH_USER`: serever login user (dev, root...)
