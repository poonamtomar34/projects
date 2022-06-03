// let colorName=document.querySelector('#colorname')
// const colorHex='#'+Math.random
// const colorInString=colorHex.toString
var colorName = ["red", "yellow", "green", "blue", "pink", "purple"];
let randomColor = document.querySelector("#colorname");
let clickBtn = document.querySelector("#btn");
var changeColor = document.querySelector("body");

clickBtn.addEventListener("click", clickMe);
function clickMe() {
  //randomNumbefr is storing the getRandomNumber function and returning rndom number every time the function is called.
  const randomNumber = getRandomNumber();
  randomColor.innerHTML = colorName[randomNumber];
  changeColor.style.backgroundColor = colorName[randomNumber];
}
function getRandomNumber() {
  return Math.floor(Math.random() * colorName.length);
}