# FoodClub Dashboard

Hello and welcome!

This is a Progressive Web Application built using [Vue.js](https://vuejs.org/) that works as a dashboard for the [FoodClub](https://github.com/pedro1191/my-products-vue) application. It consumes a [REST API](https://github.com/pedro1191/my-products-dashboard-rest) where the administrator can log in and manage the categories and things.

The following technologies are being used:
- [axios](https://github.com/axios/axios): to consume the [REST API](https://github.com/pedro1191/my-products-dashboard-rest)
- [bootstrap](https://getbootstrap.com/)
- [commitlint](https://github.com/conventional-changelog/commitlint) and [husky](https://github.com/typicode/husky): to control commit messages
- [cypress](https://www.cypress.io/): for end-to-end testing
- [font awesome](https://fontawesome.com/)
- [jest](https://jestjs.io/): for unit testing
- [vue-gtag](https://github.com/MatteoGabriele/vue-gtag): to send event data to Google Analytics
- [vuelidate](https://github.com/vuelidate/vuelidate): to validate the insert and update forms

## Live demo
Please visit [https://dashboard.foodclub.pedrohsalmeida.com](https://dashboard.foodclub.pedrohsalmeida.com) for a live demo.

## Project setup
### Install dependencies
```
npm install
```

### Create a **.env.local** file from **.env.example** and set the environment variable values
```
cp .env.example .env.local
```

- **PORT**: optional. The port in which the application should run
- **VUE_APP_DEFAULT_MYFOOD_APP_URL**: mandatory. It should point to a running instance of the [FoodClub](https://github.com/pedro1191/my-products-vue) application
- **VUE_APP_DEFAULT_BACKEND_API_URL**: mandatory. It should point to a running instance of the [REST API](https://github.com/pedro1191/my-products-dashboard-rest) it consumes

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Runs unit tests
```
npm run test:unit
```

### Runs end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```