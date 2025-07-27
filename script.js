const inputSlider = document.querySelector("[data-lengthslider]");
const lengthdisplay = document.querySelector("[data-lengthNumber]");

const passworddisplay = document.querySelector("[data-passworddisplay]");
const copybutton = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercasecheck = document.querySelector( "#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numberscheck = document.querySelector("#numbers");
const symbolscheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generatebutton");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()-_+={[}]:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkcount = 0;
handleslider();
setindicator("#ccc");
//set strength color to grey

//set password length
function handleslider(){
inputSlider.value = passwordLength;
lengthdisplay.innerText = passwordLength;
const min = inputSlider.min;
const max = inputSlider.max;
inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
function setindicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxshadow = '0px 0px 12px 1px ${color}';
}
function getRndInteger(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowercase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUppercase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol(){
const randNum = getRndInteger(0,symbols.length);
return symbols.charAt(randNum);
}
function calcstrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercasecheck.checked) hasUpper = true;
    if(lowercasecheck.checked) hasLower = true;
    if(numberscheck.checked) hasNum = true;
    if(symbolscheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setindicator("#0f0");}
        else if((hasLower || hasUpper) &&
            (hasNum || hasSym) &&
            passwordLength >= 6
)
 {setindicator("#ff0");}  
else {
            setindicator("#f00");
        }
    }
    async function copyContent() {
        try {
            await navigator.clipboard.writeText(passworddisplay.value);
            copyMsg.innerText = "copied";
        } catch (e) {
            copyMsg.innerText = "failed";
        }
        copyMsg.classList.add("active");
        setTimeout(() => {
            copyMsg.classList.remove("active");
        }, 2000);
    }
    

    function shufflepassword(array){
        // fisher yates method
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let str = "";
        array.forEach((el) => (str += el));
        return str;   
    }
    
function handlecheckboxchange() {
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked)
        checkcount++;
    });
    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleslider();
    }
}
    allcheckbox.forEach((checkbox) => {
        checkbox.addEventListener('change', handlecheckboxchange);
    })

    inputSlider.addEventListener('input', (e) => {
        passwordLength = e.target.value;
        handleslider();
    })
    

    copybutton.addEventListener('click', () => {
      if(passworddisplay.value)  
      copyContent();
    })
    console.log("generate button");
    generatebtn.addEventListener('click',() => {
if(checkcount == 0) 
return;
    console.log("generate button clicked");
if(passwordLength < checkcount){
    passwordLength = checkcount;
    handleslider();
}
console.log("starting the journey");
    
password = "";


//if(uppercasecheck.checked){
//    password += generateuppercase();
//}
//if(lowercasecheck.checked){
  //  password += generateu=lowercase();
//}
//if(randomNumbercheck.checked){
  //  password += generaterandomNumber();
//}
//if(symbolcheck.checked){
  //  password += generateSymbol();
//}
  //  });

  let funcArr = [];
  if(uppercasecheck.checked)
  funcArr.push(generateUppercase);
  if(lowercasecheck.checked)
  funcArr.push(generateLowercase);
  if(numberscheck.checked)
  funcArr.push(generateRandomNumber);
  if(symbolscheck.checked)
  funcArr.push(generateSymbol);
//compulsory addition
for(let i=0; i<funcArr.length; i++){
    password += funcArr[i]();
}
console.log("compulsary addition done");
//remaing addition
for(let i=0; i<passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0 , funcArr.length);
    console.log("randIndex" + randIndex);
    password += funcArr[randIndex]();
}
console.log("remianing addition is done");
//shuffle the password
password = shufflepassword(Array.from(password));
console.log("shuffle password is done");
//show in UI
passworddisplay.value = password;
console.log("UI addition done");
//calculate strength
calcstrength();
    });
