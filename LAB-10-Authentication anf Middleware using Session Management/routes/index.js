//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

const usersRoutes = require('./routesAPI');

const constructorMethod = (app) => {
    app.use('/', usersRoutes); 

    app.use('*', (req, res) => {
      res.status(404).render('error',{error: 'Not Found',title:'error Found'}); ;
    });
};

module.exports = constructorMethod;