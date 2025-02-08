// let num1 = prompt ("enter 1 gram gold cost")
// let num2 = prompt ("enter weight")
// let num3 = prompt ("karat")
// let num4 = 0.0416666667;

// let total = num1*num2*num3*num4;

// console.log(total);
let num1 = document.querySelector("#num1");
let num2 = document.querySelector("#num2");
let num3 = document.querySelector("#num3");
let button = document.querySelector("button");
let costBox = document.querySelector("#costBox");
let num4 = 0.0416666667;

button.addEventListener("click",() => {
    costBox.value = num1.value * num2.value * num3.value *num4;
});
console.log(costBox);