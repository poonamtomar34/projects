const colorArr=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
const getBodyElement=document.querySelector('body');
const getColorName=document.querySelector('#colorname');
const getButtonElement=document.querySelector('#btn');

getButtonElement.addEventListener('click', clickMe);
function clickMe(){
    let hexColor='#';
    for (i=0;i<6;i++){
        hexColor=hexColor+colorArr[getRandomNumber()];
    }
    getColorName.innerHTML=hexColor;
    getBodyElement.style.backgroundColor=hexColor;
}
function getRandomNumber(){
    return Math.floor(Math.random()*colorArr.length);
}