//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;
const path = require('path');

router.route("/").get(async (req, res) => {
  //code here for GET
  res.sendFile(path.resolve('static/homepage.html'));
});

router.route("/searchpeople").post(async (req, res) => {
  try{
    let name=req.body;
    if(!name.searchPersonName){throw 'no person name passed here!'}
    if(typeof name.searchPersonName!='string'){throw 'the person name must be string'}
    if(name.searchPersonName.trim().length == 0){throw 'the string person name is empty'}
    let result=await peopleData.searchPeopleByName(name.searchPersonName);
    if(result.length==0){
      res.render('personNotFound',{searchPersonName : name.searchPersonName,title:'Person Not Found'});
    }
    else{
      res.render('peopleFound',{people: result, title:'People Found',supplied:name.searchPersonName});
    } 
  }catch(e){
    res.status(400).render('error',{error:e ,title:'error Found'}, );
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  try{
    let id=req.params.id;
    id=Number(id);
    if(!id){throw 'no id passed here!'};
    if(typeof id!='number'){throw 'id must be a number'};
    if(id % 1 != 0){throw 'invalid id'};
    let result=await peopleData.searchPeopleByID(id);
      res.render('personFoundByID',{person: result,title: 'Person Found'}); 
  }catch(e){
    res.status(400);
    res.render('error',{error: e,title:'error Found'});
  }

});

module.exports = router;
