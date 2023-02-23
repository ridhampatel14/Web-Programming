/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied 
(throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the 
    example below. You put all of your function calls within main each in its own try/catch block. 
    and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the 
    files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following 
    format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/

const people = require("./people");
const companies= require("./companies");

async function main(){
    // console.log('**********************1st people ***********************')
    try{
        const peopledata = await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await people.getPersonById({1:'is'});
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }


    // console.log('**********************2nd people ***********************')

    try{
        const peopledata = await people.sameJobTitle("Help Desk Operator");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }



    try{
        const peopledata = await people.sameJobTitle(true);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    // console.log('**********************3rd people ***********************');

        try{
            const peopledata = await people.getPostalCodes("Salt Lake City", "Utah");
            console.log (peopledata);
        }catch(e){
            console.log (e);
        }

        try{
            const peopledata = await people.getPostalCodes();
            console.log (peopledata);
        }catch(e){
            console.log (e);
        }

    // console.log('**********************4th people ***********************');


    try{
        const peopledata = await people.sameCityAndState("Salt Lake City", "Utah");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }


    try{
        const peopledata = await people.sameCityAndState(13, 25);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    //console.log('**********************1st company ***********************');



    try{
        const peopledata = await companies.listEmployees("Yost, Harris and Cormier");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await companies.listEmployees('foobar');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    //console.log('**********************2nd company ***********************');
    try{
        const peopledata = await companies.sameIndustry('Auto Parts:O.E.M.');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await companies.sameIndustry('        ');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    //console.log('**********************3rd company ***********************');
    try{
        const peopledata = await companies.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await companies.getCompanyById(undefined);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

}


main();

