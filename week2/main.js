const dob = new Date ('January 14 1990');
const now = new Date();

// console.log(now.getFullYear(), dob.getFullYear());
const age = now.getFullYear() - dob.getFullYear();
const monthdiff = now.getMonth() - dob.getMonth();
const daydiff = now.getDate() - dob.getDate();
console.log(daydiff);
// const age = now - dob
// console.log(age);

const days = document.getElementById("day");
const months = document.getElementById("month");
const years = document.getElementById("year");
const calcyear = document.getElementById("calcyears");
const calcmonth = document.getElementById("calcmonths");
const calcday = document.getElementById("calcdays");





days.innerText =  dob.getDate();
months.innerText =  dob.getMonth();
years.innerText = dob.getFullYear();
calcyear.innerText = age;
calcmonth.innerText = monthdiff;
calcday.innerText =daydiff;

