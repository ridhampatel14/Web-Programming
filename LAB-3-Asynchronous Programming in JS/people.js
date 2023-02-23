const axios = require('axios');

const URL='https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json';
async function getPeopleData(){
    const {data}=await axios.get(URL);
    return data;
}

function capitalizeFirstLetter(string) {
    let ls=string.split(' ');
    let new_ls=[];
    for (let i = 0; i < ls.length; i++) {
        new_ls.push(ls[i].charAt(0).toUpperCase() + ls[i].slice(1).toLowerCase());
    } 
    return new_ls.join(' ');
}

function sort(arr){
    arr=arr.map((val)=>{return Number(val)});
    for (let i = 0; i < arr.length; i++) {
        let min=arr[i];
        for (let j = i+1; j < arr.length; j++) {
            if(arr[j]<min){
                temp=min
                min=arr[j]
                arr[j]=temp
            }
        }
        arr[i]=min        
    }
    return arr;
}

function sort_by_lastname(arr){
    arr=arr.sort();
    let f_arr=[];
    arr.forEach(element => {
        temp=element.split(' ');
        f_arr.push(temp[1]+' '+temp[0]);
    });
    return f_arr;
}


async function getPersonById(id){
    if(arguments.length > 1){throw 'passed arguments are more than required arguments'}
    if(!id){throw 'no id passed here!'}
    if(typeof id!='string'){throw 'the id must be string'}
    if(id.trim().length == 0){throw 'the string is empty'}
    let data =await getPeopleData();
    for (let i = 0; i < data.length; i++) {
        if(data[i].id==id.trim()){
            return data[i];
        };
    }
    return 'the id is not found!';
};

async function sameJobTitle(jobTitle){
    if(arguments.length > 1){throw 'passed arguments are more than required arguments'}
    if(!jobTitle){throw 'no jobTitle passed here!'}
    if(typeof jobTitle!='string'){throw 'the jobTitle must be string'}
    if(jobTitle.trim().length == 0){throw 'the string jobTitle is empty'}
    let data=await getPeopleData();
    jobTitle=capitalizeFirstLetter(jobTitle.trim());
    let res=[];
    for (let i = 0; i < data.length; i++) {
        if(data[i].job_title==jobTitle){
            res.push(data[i]);
        }
    }
    if(res.length<2){
        return 'there are no people or less than 2 people with the same job title'
    }
    return res;
};

async function getPostalCodes(city, state){
    if(arguments.length > 2){throw 'passed arguments are more than required arguments'}
    if(arguments.length == 0){throw 'no arguments passed!'}
    if(!city || !state){throw 'one of the parameters are not passed here!'}
    if(typeof city!='string' || typeof state!='string'){throw 'the passed parameters must be string'}
    if(city.trim().length == 0 || state.trim().length == 0){throw 'any of the string is empty string'}
    city=capitalizeFirstLetter(city.trim());
    state=capitalizeFirstLetter(state.trim());
    let data=await getPeopleData();
    let res=[]
    for(let i = 0; i < data.length; i++){
        if(data[i].city==city && data[i].state==state){
            res.push(data[i].postal_code);
        }
    }
    if(res.length<1){
        return 'no postal code found for given city and state'
    }
    return sort(res);
};

async function sameCityAndState(city, state){
    if(arguments.length > 2){throw 'passed arguments are more than required arguments'}
    if(arguments.length == 0){throw 'no arguments passed!'}
    if(!city || !state){throw 'one of the parameters are not passed here!'}
    if(typeof city!='string' || typeof state!='string'){throw 'the passed parameters must be string'}
    if(city.trim().length == 0 || state.trim().length == 0){throw 'any of the string is empty string'}
    city=capitalizeFirstLetter(city.trim());
    state=capitalizeFirstLetter(state.trim());
    let data=await getPeopleData();
    let res=[]
    for (let i = 0; i < data.length; i++) {
        if(data[i].city==city && data[i].state==state){
            res.push(data[i].last_name+ ' ' +data[i].first_name);
        }
    }
    if(res.length<2){
        return 'there are not atleast two people who live in the same city and state'
    }
    return sort_by_lastname(res);
};

module.exports = {
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState,
};

