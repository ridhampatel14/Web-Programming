//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
function validateDate(date){
    const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    date=date.trim();
    var c_year = new Date().getFullYear();  
    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    arr=date.split('/');
    if(arr.length !== 3){
        return false;
    }

    month=arr[0];
    day=arr[1];
    year=arr[2];

    if(month.length!==2 || day.length!==2 || year.length!==4){
        return false;
    }


    if(re_for_specialcharacter.test(month) || re_for_specialcharacter.test(day) || re_for_specialcharacter.test(year)){
        return false;
    }

    month= Number(month);
    day= Number(day);
    year= Number(year);


    if(!Number.isInteger(month) || !Number.isInteger(day)  || !Number.isInteger(year)){
        return false;
    }


    if(year<1900 || year> (c_year+2) ){
        return false;
    }
    if(month<0 || month>12){
        return false;
    }
    if(month==2){
        if(day>28){
            return false;
        }
    }
    if(day>ListofDays[month-1]){
        return false;
    }
    return true;
}
// console.log(validateDate("09/31/2019"))//false
// console.log(validateDate("02/30/2020"))//false
// console.log(validateDate(" 01/01/1876"))//false
// console.log(validateDate("13/31/2019"))//false
// console.log(validateDate("09/31/2043"))//false
// console.log(validateDate("12/31/2019"))//true
// console.log(validateDate("09/05/2019"))//true
// console.log(validateDate("02/29/2019"))//false
// console.log(validateDate("02/28/2019"))//true
// console.log(validateDate("02/28/2019/32"))//false
// console.log(validateDate(""))//false
// console.log(validateDate('ridhan'))//false
// console.log(validateDate("20.34.1976"))//false
// console.log(validateDate("02/28/1915"))//true
// console.log(validateDate("2/28/2019"))//false
// console.log(validateDate("02/28/19"))//false
// console.log(validateDate("02/2/2019"))//false
// console.log(validateDate("   02/02/2019   "))//ture
// console.log(validateDate("02/.2/2019"))//false
// console.log(validateDate("02/2./2019"))//false
// console.log(validateDate("02/2.0/2019"))//false
// console.log(validateDate("02/002/2019"))//false






function validate_runtime(runtime){
    const re_for_specialcharacter=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    runtime=runtime.trim();
    if(re_for_specialcharacter.test(runtime)){
        return false;
    }
    arr=runtime.split(' ');
    if(arr.length!=2){
        return false;
    };
    hour=String(arr[0]);
    min=String(arr[1]);
    hour=hour.replace('h','');
    min=min.replace('min','');
    if(hour.length>2 || hour.length<1){
        return false;
    }
    if(min.length>2 || min.length<1){
        return false;
    }
    hour=Number(hour);
    min=Number(min);
    if(!Number.isInteger(hour)){
        return false;
    }
    if(!Number.isInteger(min)){
        return false;
    }
    if(hour<1){
        return false;
    }
    if(min<0 || min>59){
        return false;
    }
    return true;
}

// console.log(validate_runtime('2h 30min'))//true
// console.log(validate_runtime('2h 0min'))//ture
// console.log(validate_runtime('1h 59min'))//true
// console.log(validate_runtime('-5h 20min'))//false
// console.log(validate_runtime('3.5h 10min'))//false
// console.log(validate_runtime('0h 30min'))//false
// console.log(validate_runtime('2h 60min'))//false
// console.log(validate_runtime('02h 30min'))//true
// console.log(validate_runtime('       2h 30min    '))//true
// console.log(validate_runtime('02h 0030min'))//false
// console.log(validate_runtime('2h min'))//false
// console.log(validate_runtime('2h'))//false
// console.log(validate_runtime('30min'))//false

// console.log(validate_runtime('2.h 30min'))//false
// console.log(validate_runtime('2h 3.min'))//false
// console.log(validate_runtime('20h .3min'))//false
// console.log(validate_runtime('h 30min'))//false
// console.log(validate_runtime('2h 3min'))//true
// console.log(validate_runtime('20h 3min'))//true
// console.log(validate_runtime('20h 3mi'))//false




module.exports = {
    validateDate,
    validate_runtime
}