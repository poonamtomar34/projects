//this is the intial count
let count = 0;
//select count value
const getNumberCount = document.querySelector("#numberCount");
//rather than creating diffrent function for every button stroring every button in diffrent variable, use queryselectorall and for each.
// That will require only 1 fuction then.
const btns = document.querySelectorAll("button");
//create a function and use forEach function.
//forEach crates a call back fuction and takes 3 parameters, currentValue(this is required),index(optional),array itself(opional)
//here, myButton is the current value in the array(or nodelist),btns
btns.forEach(function (myButton) {
  myButton.addEventListener("click", clickMe);
  //here we have 3 buttons, so we want to keep a check on what button is being clicked, i.e, which event is being passed, (e) will do that for us
  function clickMe(e) {
    //currentTarget returns the element whose addEventListener triggered the event, for example if decrease is clicked, it will return the repective button's class
    //classList returns every class of the event triggered
    const styles = e.currentTarget.classList;
    //contains tells which class the addEventListener contains
    if (styles.contains("decreament")) {
      count = count - 1;
    } else if (styles.contains("increament")) {
      count = count + 1;
    } else {
      count = 0;
    }
    if (count > 0) {
      getNumberCount.style.color = "green";
    }
    if (count < 0) {
      getNumberCount.style.color = "orange";
    }
    if (count == 0) {
      getNumberCount.style.color = "black";
    }
    getNumberCount.textContent = count;
  }
});

// decreaseButton.addEventListener('click', decreaseMe);
toggle = 0;
const getToggleBtn = document.getElementsByTagName("div")[1];
const getBodyElm = document.querySelector("body");


getToggleBtn.addEventListener("click", pleaseclk);
function pleaseclk() {
  if (toggle == 0) {
    getBodyElm.classList.add("stylechange");
    toggle = toggle + 1;
  } else {
    getBodyElm.classList.remove("stylechange");
    toggle = 0;
  }
}
