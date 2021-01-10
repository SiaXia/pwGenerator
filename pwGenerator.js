const numbers = document.getElementById("numbers"),
    alphabets = document.getElementById("alphabets"),
    specialChars = document.getElementById("specialChars"),
    specialCharsTypes = document.getElementById("specialCharsTypes"),
    pwList = document.querySelector(".pwList"),
    values = document.querySelector(".values"),
    keyInfo = document.getElementsByClassName("keyInfo"),
    valueTitle = document.getElementsByClassName("valueTitle"),
    valueInfo = document.getElementsByClassName("valueInfo"),
    PW_LENGTH=12,
    PW_LIST_LENGTH=50;
let numVal, alphVal, spcVal, spcTpVal,
    isAlerted=false;

function generate(){
    numVal=numbers.value;
    alphVal=alphabets.value;
    spcVal=specialChars.value;
    spcTpVal=specialCharsTypes.value;

    if(!(numVal===""&&alphVal===""&&spcVal==="")){
        isAlerted=false;
        numAlert(numVal);
        numAlert(alphVal);
        if(spcVal){
            numAlert(spcVal);
            if(!spcTpVal)
                alert("Type the sort of special characters");
            else {
                spcsAlert(spcTpVal);
                isAlerted?true:paintPWList();
            }
        }
        else
            isAlerted?true:paintPWList();
        isAlerted=false;
    }
    else
        init();
}

function strToInt(str1, str2, str3){
    const str=[str1, str2, str3];
    let result=0;

    str.forEach(element => {
        if(element==="")
            result+=0;
        else
            result+=parseInt(element);
    });
    return result;
}

function paintPWList(){
    pwList.innerHTML="";

    const pwLen = strToInt(numVal, alphVal, spcVal);
    if(pwLen<=PW_LENGTH){
        for(let i=0; i<PW_LIST_LENGTH; i++){
            const li=document.createElement("li");
            const span=document.createElement("span");
            const className=String.fromCharCode(Math.floor(i/25)+97);
            li.className=className;
            span.innerText=genPW();
            li.appendChild(span);
            pwList.appendChild(li);
            const toDoObj=span;
        }
        valueTitle[0].innerText=`Passwords has been generated`;
        valueInfo[0].innerText=`${PW_LIST_LENGTH} passwords`;
    }
    else
        alert("Password should be less than "+(PW_LENGTH+1)+" words");
}

function numAlert(value){
    for(let i=0; i<value.length; i++){
        let input=value.charCodeAt(i);
        if(input<48||input>57){
            if(!isAlerted)
                alert("Only integer can be used for the number of password types");
            value="";
            isAlerted=true;
            return;
        }
    }
}

function spcsAlert(value){
    for(let i=0; i<value.length; i++){
        let input=value.charCodeAt(i);
        if(!(input>32&&input<48
        ||input>57&&input<65
        ||input>91&&input<97
        ||input>122&&input<126)){
                alert("Only special characters can be used for password");
            value="";
            isAlerted=true;
            return;
        }
    }
}

function genPW(){
    let pw=[];
    let input=genNums()+genAlphs()+genSpcs();
    const tmp=input.split(' ');
    tmp.pop();

    const pwLen=tmp.length;

    for(let i=0; i<pwLen; i++){
        let idx=Math.floor(Math.random()*tmp.length);
        pw+=tmp[idx];
        tmp.splice(idx,1);
    }
    return pw;
}

function genNums(){
    let nums=[];
    for(let i=0; i<numVal; i++){
        nums+=Math.floor(Math.random()*10)+' ';
    }
    return nums;
}

function genAlphs(){
    let alphs=[];
    for(let i=0; i<alphVal; i++){
        let upper=Math.floor(Math.random()*2);
        if(upper)
            alphs+=String.fromCharCode([Math.floor(Math.random()*26+65)])+' ';
        else
            alphs+=String.fromCharCode([Math.floor(Math.random()*26+97)])+' ';
    }
    return alphs;
}

function genSpcs(){
    let spcs=[];

    for(let i=0; i<spcVal; i++){
        let idx = Math.floor(Math.random()*spcTpVal.length);
        spcs+=spcTpVal[idx]+" ";
    }
    return spcs;
}

function init(){
    keyInfo[0].innerText=`Password should be less than ${PW_LENGTH+1} words`;
    valueTitle[0].innerText=`Generating...`;
    valueInfo[0].innerText=``;
    pwList.innerHTML="";
}

init();