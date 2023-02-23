//Here you will require route files and export them as used in previous labs
const peopleRoutes = require('./people');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/', peopleRoutes); 

    app.use('*', (req, res) => {
      res.status(404).render('error',{error: 'Not Found',title:'error Found'}); ;
    });
  };
  
  module.exports = constructorMethod;