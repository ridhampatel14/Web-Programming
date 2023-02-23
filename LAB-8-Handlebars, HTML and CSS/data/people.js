const axios = require('axios');

function checkID(id){
    if(String(id)[0]=='0'){throw 'invalid id'}
    if(id % 1 != 0){throw 'invalid id'}
}

//Axios call to get all data
const getAllPeople = async () => {
    let {data}= await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    if(!searchPersonName){throw 'no person name passed here!'}
    if(typeof searchPersonName!='string'){throw 'the person name must be string'}
    if(searchPersonName.trim().length == 0){throw 'the string person name is empty'}
    let data=await getAllPeople();
    let res=[];
    for (let i = 0; i < data.length; i++) {
        if(data[i].firstName.includes(searchPersonName) || data[i].lastName.includes(searchPersonName)){
            res.push(data[i]);
        }
    }
    res.sort((a, b) => a.id - b.id);
    return res.slice(0,20);
};
//Function to list person matching the id
const searchPeopleByID = async (id) => {
    if(!id){throw 'no id passed here!'};
    if(typeof id!='number'){throw 'id must be a number'};
    if(id % 1 != 0){throw 'invalid id'};
    let data=await getAllPeople();
    for (let i = 0; i < data.length; i++) {
        if(data[i].id==id){
            return data[i];
        }
    }
    throw 'no id found';
};

module.exports = { searchPeopleByName, searchPeopleByID };

