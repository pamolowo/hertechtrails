dayjs.extend(window.dayjs_plugin_duration);
dayjs.extend(window.dayjs_plugin_isLeapYear);

const day = document.querySelector('#input0');
const month = document.querySelector('#input1');
const year = document.querySelector('#input2');

const dayResult = document.querySelector('#days');
const monthResult = document.querySelector('#months');
const yearResult = document.querySelector('#years');

const getResult = document.querySelector('#result');

const today = dayjs().format('YYYY-MM-DD');

function displayError(i) {
    let label = document.querySelector('#label'+i);
    let input = document.querySelector('#input'+i);
    let element = document.querySelector('#inputError'+i);
    label.style.color = "#ff5959";
    input.style.outline = "1px solid #ff5959";
    element.innerHTML = "This field is required";
    element.style.display = "block";
}

function resetErrorStyle(i) {
    let label = document.querySelector('#label'+i);
    let input = document.querySelector('#input'+i);
    let element = document.querySelector('#inputError'+i);
    label.removeAttribute('style');
    input.removeAttribute('style');
    element.style.display = "none";
}

function resetResultDisplay() {
    dayResult.innerHTML = '--';
    monthResult.innerHTML = '--';
    yearResult.innerHTML = '--';
}

function checkIfValidData(data, i) {
    let label = document.querySelector('#label'+i);
    let input = document.querySelector('#input'+i);
    let element = document.querySelector('#inputError'+i);
    label.style.color = "#ff5959";
    input.style.outline = "1px solid #ff5959";
    element.innerHTML = data;
    element.style.display = "block";
}

window.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        getResult.click();
    }
})

getResult.addEventListener('click', () => {

    const valueArray = [day.value, month.value, year.value];

    if (day.value === "" || month.value === "" || year.value === "") {
        for (let i = 0; i < valueArray.length; i++) {
            if (valueArray[i] === "") {
                displayError(i);
            } else {
                resetErrorStyle(i)
            }
        }
        return false
    }

    const result = year.value + '-' + month.value + '-' + day.value;
    
    const date1 = dayjs(today);
    
    const dateDiff = date1.diff(result);

    const isLeapYear = dayjs(result).isLeapYear();

    const day30 = ["4","04","6","06","9","09","11"];
    const day31 = ["1","01","3","03","5","05","7","07","8","08","10","12"]

    if (month.value == 2 && isLeapYear) {
        if (day.value < 1 || day.value > 29) {
            checkIfValidData('Must be a valid day', 0);
            resetResultDisplay();
            return false;
        } else {
            resetErrorStyle(0)
            const daysDiff = dayjs.duration(dateDiff).days();
            dayResult.innerHTML = daysDiff;
        }
    } else if (month.value == 2 && !isLeapYear) {
        if (day.value < 1 || day.value > 28) {
            checkIfValidData('Must be a valid day', 0);
            resetResultDisplay();
            return false;
        } else {
            resetErrorStyle(0)
            const daysDiff = dayjs.duration(dateDiff).days();
            dayResult.innerHTML = daysDiff;
        }
    }

    if (day30.includes(month.value)) {
        if (day.value < 1 || day.value > 30) {
            checkIfValidData('Must be a valid day', 0);
            resetResultDisplay();
            return false;
        } else {
            resetErrorStyle(0)
            const daysDiff = dayjs.duration(dateDiff).days();
            dayResult.innerHTML = daysDiff;
        }
    } else if (day31.includes(month.value)) {
        if (day.value < 1 || day.value > 31) {
            checkIfValidData('Must be a valid day', 0);
            resetResultDisplay();
            return false;
        } else {
            resetErrorStyle(0)
            const daysDiff = dayjs.duration(dateDiff).days();
            dayResult.innerHTML = daysDiff;
        }
    }
    
    if (month.value < 1 || month.value > 12) {
        checkIfValidData('Must be a valid month', 1);
        resetResultDisplay();
        return false;
    } else {
        resetErrorStyle(1)
        const monthsDiff = dayjs.duration(dateDiff).months();
        monthResult.innerHTML = monthsDiff;
    }
    
    if (year.value < 1000 || year.value >= today) {
        checkIfValidData('Must be a valid year', 2);
        resetResultDisplay();
        return false;
    } else {
        resetErrorStyle(2)
        const yearsDiff = dayjs.duration(dateDiff).years();
        yearResult.innerHTML = yearsDiff;
    }

    if (dateDiff <= 0) {
        for (let i = 0; i < valueArray.length; i++) {
            let label = document.querySelector('#label'+i);
            let input = document.querySelector('#input'+i);
            label.style.color = "#ff5959";
            input.style.outline = "1px solid #ff5959";
        }
        let element = document.querySelector('#inputError0');
        element.innerHTML = 'Must be a valid date';
        element.style.display = "block";
        resetResultDisplay();
        return false;
    }
})
