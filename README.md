# Poopelo

Our neighborhood pool is closed. A lot. Almost always due to poop. Yeah, I think it's gross too. This is the source code for https://www.isthetupelopoolclosed.com, which checks our HOA's website for updates.

## Develop

Poopelo uses React for the client, and express for the server. You'll have to run `yarn` in both the root directory for the server, and the `client` directory for the front-end as they are technically two separate projects. This will install all the dependencies you need.

You can then run `yarn start` in the root directory to start both the server and client.

## Deploy

This kind of sucks, but in the `client` you have to run `yarn build` and commit the `client/build` folder to git before deploying. There may be a better way to do this with Heroku, but I haven't investigated.
