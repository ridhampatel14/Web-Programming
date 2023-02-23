const axios = require('axios');


const URL='https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json';
const Comp_URL='https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json';

async function getPeopleData(){
    const {data}=await axios.get(URL);
    return data;
}

async function getCompaniesData(){
    const {data}=await axios.get(Comp_URL);
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

async function listEmployees(companyName) {
    if(arguments.length > 1){throw 'passed arguments are more than required arguments'}
    if(!companyName){throw 'no company name passed here!'}
    if(typeof companyName!='string'){throw 'the company name must be string'}
    if(companyName.trim().length == 0){throw 'the string company name is empty'}
    let data=await getPeopleData();
    let comp_data=await getCompaniesData();
    //console.log(comp_data[0])
    companyName=companyName.trim();
    //console.log(companyName)
    let res=[];
    let obj;
    let comp_id;
    for (let i = 0; i < comp_data.length; i++) {
        if(comp_data[i].name==companyName){
            //console.log(comp_data[i])
            obj=comp_data[i];
            comp_id=comp_data[i].id;
        }
    }
    if(!obj){
        return 'no company found'
    }
    for (let i = 0; i < data.length; i++) {
        if(data[i].company_id==comp_id){
            res.push(data[i].last_name+' '+data[i].first_name);
        }
    }
    obj['employees']=sort_by_lastname(res);
    return obj;
};

async function sameIndustry(industry){
    if(arguments.length > 1){throw 'passed arguments are more than required arguments'}
    if(!industry){throw 'no industry passed here!'}
    if(typeof industry!='string'){throw 'the industry must be string'}
    if(industry.trim().length == 0){throw 'the string industry is empty'}
    let comp_data=await getCompaniesData();
    industry=industry.trim();
    let res=[];
    for (let i = 0; i < comp_data.length; i++) {
        if(comp_data[i].industry==industry){
            res.push(comp_data[i]);
        }
    }
    if(res.length==0){
        return 'No companies found with this industry!'
    }
    return res;
};

async function getCompanyById (id) {
    if(arguments.length > 1){throw 'passed arguments are more than required arguments'}
    if(!id){throw 'no id passed here!'}
    if(typeof id!='string'){throw 'the id must be string'}
    if(id.trim().length == 0){throw 'the string id is empty'}
    let comp_data=await getCompaniesData();
    id=id.trim();
    let obj;
    for (let i = 0; i < comp_data.length; i++) {
        if(comp_data[i].id==id){
            obj=comp_data[i];
        }
    }
    if(!obj){
        return 'company not found'
    }
    return obj;
};

module.exports = {
    listEmployees,
    sameIndustry,
    getCompanyById
};
