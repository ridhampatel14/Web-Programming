(function(){
    function removeByIndex(str,index) {
        return str.slice(0,index) + str.slice(index+1);
    }
    function convertToWholeNumber(element){
        const re_for_specialcharacter=/[`!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~]/;
        if(!element){
            throw 'invalid data passed!';
        }
        if(re_for_specialcharacter.test(element)){
            throw 'invalid data passed!';
        };
        if(isNaN(element)){
            throw 'invalid data passed!';
        }
        if(element%1!=0){
            throw 'invalid data passed!';
        }
        element=Number(element)
        return element;
    }
    function removeAllLastCommas(str){
        while(str[str.length-1]==','){
            str=removeByIndex(str,str.length-1);
        }
        return str;
    }
    function sortArr(arr){
        let resArr=[];
        let flag=false;
        let f_flag=true;
        arr=removeAllLastCommas(arr);
        let Arrs=arr.split(',');
        console.log(Arrs)
        for(let i=0;i<Arrs.length;i++){
            let ele=Arrs[i];
            console.log(ele+" ****")
            if(ele[0]=='[' && ele[ele.length-1]==']'){
                Arrs[i]=removeByIndex(ele,0);
                ele=removeByIndex(ele,0);
                Arrs[i]=removeByIndex(ele,ele.length-1);
                ele=removeByIndex(ele,ele.length-1);
            }
            else if(ele[0]=='['){
                flag=true;
                f_flag=false;
                console.log('went to [')
                Arrs[i]=removeByIndex(ele,0);
                ele=removeByIndex(ele,0);
            }
            else if(ele[ele.length-1]==']'){
                flag=false;
                f_flag=true;
                console.log('went to ]')
                Arrs[i]=removeByIndex(ele,ele.length-1);
                ele=removeByIndex(ele,ele.length-1);
            }
            else if(flag==false){
                throw 'invalid data passed';
            }
            else{
                Arrs[i]=Arrs[i];
            }
        }
        if(f_flag!=true){
            throw 'invalid data passed';
        }
        console.log(Arrs)
        for(let i=0;i<Arrs.length;i++){
            Arrs[i]=convertToWholeNumber(Arrs[i])
        }
        Arrs.sort(function(a, b){return a - b});
        return Arrs;
    }
    const staticForm = document.getElementById('array-form');
    if(staticForm){
        const input= document.getElementById('input');
        const errorcontainer=document.getElementById('error');
        const errorelement=document.getElementsByClassName('error-ele')[0];
        const resultcontainer=document.getElementById('result');
        const uolist=document.getElementById('uolist');
        let flag=true;

        staticForm.addEventListener('submit',(event) => {
            event.preventDefault();
            try{
                errorcontainer.classList.add('hidden');
                resultcontainer.classList.add('hidden');

                let arrays=input.value;
                arrays=arrays.trim();
                if(!arrays){
                    throw 'No data passed here!!!';
                }
                arrays=sortArr(arrays);
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(arrays));
                uolist.appendChild(li);
                if(flag){
                    li.setAttribute("class", "is-green");
                    flag=false;
                }
                else{
                    li.setAttribute("class","is-red");
                    flag=true;
                }
                resultcontainer.classList.remove('hidden');
            }catch(e){
                const message = typeof e === 'string' ? e : e.message;
                errorelement.textContent = message;
                errorcontainer.classList.remove('hidden');
            }
        });
    }
}
)();


