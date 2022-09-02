# Colete
Collaborative Expense Tracker

<img src="https://user-images.githubusercontent.com/17814490/188208559-3e3ab73f-485c-4415-9772-45568280361f.png" width="200"> <img src="https://user-images.githubusercontent.com/17814490/188208762-672703bd-b480-4b79-8e52-7ffddcb444e3.png" width="200"> <img src="https://user-images.githubusercontent.com/17814490/188210467-4f4191a3-19d3-4252-af88-4e0e3c71ccdb.png" width="200"> <img src="https://user-images.githubusercontent.com/17814490/188209647-1bdff39f-1077-41b2-91a6-c98e98b66b13.png" width="200">

## Features
- Multiple workspaces
- Create your own categories for expenses 
- Collaborate with other users in workspaces
- Shared comments on individual expenses

## How to setup and run
- ```npm i``` to install dependencies
- Install and start postgresql database locally
- ```npx sequelize db:create``` to create database
- ```npx sequelize db:migrate``` to create tables
- ```npx sequelize db:seed:all``` to create seed data
- ```npm run watch``` to run webpack
- Go to ```localhost:3004/``` to start using the app

## Tech Used
- Front end is done using [React](https://reactjs.org/)
- Back end is done using [Node](https://nodejs.org/) and [Express](https://expressjs.com/)
- Routing is done using [React Router](https://reactrouter.com/)
- Chart is done using [Recharts](https://recharts.org/)
- UI is done using [Material-UI](https://mui.com/)
- Database is using [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/) is used for ORM
- Module bundler done using [Webpack](https://webpack.js.org/)
