# SISTEMA MEMBRESIA PARA IGLESIAS
App para llevar la gestión de las persoonas que pertenecen a la iglesia local.

## App

[Deployed on Netlify (front-end) & Heroku (back-end)](https://iglesiapp.com)

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [Redux](https://redux.js.org/) - State management library
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Middleware which allows action creators to return a function
- [React Router](https://reactrouter.com/) - Library for general routing & navigation
- [Formik](https://formik.org) - Library for flexible & extensible forms
- [Material-UI w/ CSS customisations](https://material-ui.com/) - UI library
- [Yup](https://github.com/jquense/yup) - Form validation tool
- [chart.js](https://www.chartjs.org) - Library for the graphs and charts

#### Back-end

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [MongoDB](https://www.mongodb.com) - Database to store data
- [mongoose](https://mongoosejs.com) - A schema-based solution to model the application data
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file
- [Cloudinary](https://cloudinary.com) - A platform to storage the images

## Screenshots
![1](https://user-images.githubusercontent.com/49075496/124005041-7e72c900-d98d-11eb-9b57-ae502f410a3d.png)
![2](https://user-images.githubusercontent.com/49075496/124005206-a8c48680-d98d-11eb-9388-d56800d9d117.png)
![3](https://user-images.githubusercontent.com/49075496/124005212-a9f5b380-d98d-11eb-8829-4ef33400fb64.png)
![4](https://user-images.githubusercontent.com/49075496/124005214-aa8e4a00-d98d-11eb-8e41-75a1a29798c4.png)
![5](https://user-images.githubusercontent.com/49075496/124005220-ab26e080-d98d-11eb-8d52-2d83938cbeae.png)
![6](https://user-images.githubusercontent.com/49075496/124005222-abbf7700-d98d-11eb-9054-98668a4e2fa8.png)
![7](https://user-images.githubusercontent.com/49075496/124005223-abbf7700-d98d-11eb-906a-7139c181c4c5.png)
![8](https://user-images.githubusercontent.com/49075496/124005227-ac580d80-d98d-11eb-86c9-d68c178e4bd1.png)
![9](https://user-images.githubusercontent.com/49075496/124005228-acf0a400-d98d-11eb-9acf-276b63bcb9b3.png)
![10](https://user-images.githubusercontent.com/49075496/124005230-ad893a80-d98d-11eb-82f6-b6b591c96e05.png)
![11](https://user-images.githubusercontent.com/49075496/124005231-ad893a80-d98d-11eb-8c35-dc8a00d4335b.png)
![12](https://user-images.githubusercontent.com/49075496/124005233-ae21d100-d98d-11eb-8b99-27a2f1e75bfc.png)
![13](https://user-images.githubusercontent.com/49075496/124005237-ae21d100-d98d-11eb-8913-14158afbf3c2.png)
![14](https://user-images.githubusercontent.com/49075496/124005238-aeba6780-d98d-11eb-8ca3-9ab91e86dfc6.png)

## Quick start

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run start` or `yarn start`

- Views are on: `localhost:3000`


## File Structure

Within the download you'll find the following directories and files:

```
iglesiapp - client

├── public
└── src
	├── components
	├── layouts
	├── mixins
	├── redux
        ├── reports
	├── theme
	├── utils
	├── views
	│	├── Account
	│	├── auth
	│	├── catalogos
	│	├── dashboard
	│	├── errors
	│	├── iglesias
	│	├── inicio
	│	├── notasGlobal
	│	├── personaFetalle
	│	├── personas
	│	└── usuarios
	├── App.js
	├── index.js
	└── Routes.js
	

iglesiapp - server

├── middleware
├── models
├── requests
├── routers
├── uploads
├── utils
└── index.js
```
