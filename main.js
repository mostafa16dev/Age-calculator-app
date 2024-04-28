const LIGHT_RED_COLOR = 'hsl(0, 100%, 67%)';
const LIGHT_GRAY_COLOR = 'hsl(0, 0%, 86%)';
const SMOKEY_GRAY_COLOR = 'hsl(0, 1%, 44%)';

const validateForm = (formThis) => {
    const required_error_message = 'This field is required';
    if (!isValidDate(formThis.day.value, formThis.month.value, formThis.year.value)) {
        makeInvalidInputField(formThis.day, 'Must be a valid date');
        makeInvalidInputField(formThis.month, '');
        makeInvalidInputField(formThis.year, '');
    }
    else {
        makeValidInputField(formThis.day);
        makeValidInputField(formThis.month);
        makeValidInputField(formThis.year);
        displayAge(formThis.year.value, formThis.month.value, formThis.day.value);
    }
    if (isEmpty(formThis.day.value)) {
        makeInvalidInputField(formThis.day, required_error_message);
    }
    if (!isDay(formThis.day.value) && !isEmpty(formThis.day.value)) {
        makeInvalidInputField(formThis.day, 'Must be a valid day');
    }
    else if (!isEmpty(formThis.day.value) && isDay(formThis.day.value) && isValidDate(formThis.day.value, formThis.month.value, formThis.year.value)) {
        makeValidInputField(formThis.day);
    }
    if (isEmpty(formThis.month.value)) {
        makeInvalidInputField(formThis.month, required_error_message);
    }
    if (!isMonth(formThis.month.value) && !isEmpty(formThis.month.value)) {
        makeInvalidInputField(formThis.month, 'Must be a valid month');
    }
    else if (isMonth(formThis.month.value) && !isEmpty(formThis.month.value) && isValidDate(formThis.day.value, formThis.month.value, formThis.year.value)) {
        makeValidInputField(formThis.month);
    }
    if (isEmpty(formThis.year.value)) {
        makeInvalidInputField(formThis.year, required_error_message);
    }
    if (isFutureYear(formThis.year.value)) {
        makeInvalidInputField(formThis.year, 'Must be in the past');
    }
    else if (!isEmpty(formThis.year.value) && !isFutureYear(formThis.year.value) && isValidDate(formThis.day.value, formThis.month.value, formThis.year.value)) {
        makeValidInputField(formThis.year);
    }
    return false;
}

const isEmpty = (value) => {
    return !value.trim().length;
}

const isDay = (value) => {
    return (value >= 1 && value <= 31);
}

const isMonth = value => {
    return (value >= 1 && value <= 12);
}

const isFutureYear = year => {
    return new Date().getFullYear() < year;
}

const makeInvalidInputField = (field, errorMessage) => {
    field.style.borderColor = LIGHT_RED_COLOR;
    field.previousElementSibling.style.color = LIGHT_RED_COLOR;
    let nextInvalid = field.nextElementSibling;
    nextInvalid.innerHTML = errorMessage;
}

const makeValidInputField = field => {
    field.style.borderColor = LIGHT_GRAY_COLOR;
    field.previousElementSibling.style.color = SMOKEY_GRAY_COLOR;
    field.nextElementSibling.innerHTML = '';
}

const isValidDate = (day, month, year) => {
    day = day.padStart(2, '0');
    month = month.padStart(2, '0');
    // Date format: YYYY-MM-DD

    // Parse integer values from the date strings
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);

    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

const displayAge = (year, month, day) => {
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const differenceYear = currentYear - year;
    const differenceMonth = currentMonth - month;
    let differenceDay = getCurrentMonthLength() - Math.abs(currentDay - day);
    let displayYear = differenceYear;
    let displayMonth = differenceMonth;
    let displayDay = differenceDay;
    if (differenceMonth < 0 || (differenceMonth === 0 && differenceDay < 0)) {
        displayYear--;
    }

    if (differenceMonth === 0) {
        displayMonth = differenceMonth;
    }
    else if (differenceMonth <= 1) {
        displayMonth = 12 - (Math.abs(differenceMonth));
    }

    // main days and months
    if (currentDay === day && month === currentMonth) {
        displayDay = currentDay - day;
    }
    if (currentDay === day && month < currentMonth) {
        displayDay = currentDay - day;
    }
    if (currentDay === day && month > currentMonth) {
        displayDay = currentDay - day;
    }
    if (currentDay < day && month === currentMonth) {
        displayYear--;
        displayMonth = 12 - (Math.abs(differenceMonth)) - 1;
    }
    if (currentDay < day && month < currentMonth) {
        displayDay = Math.abs(currentDay - day);
    }
    if (currentDay < day && month > currentMonth) {
        displayDay = Math.abs(currentDay - day);
    }
    if (currentDay > day && month === currentMonth) {
        displayYear--;
        displayMonth = 11;
    }
    if (currentDay > day && month < currentMonth) {
        displayMonth = differenceMonth - 1;
    }
    if (currentDay > day && month > currentMonth) {
        displayMonth = 12 - Math.abs(differenceMonth - 1);
    }

    document.getElementById('results-years').innerHTML = displayYear;
    document.getElementById('results-months').innerHTML = displayMonth;
    document.getElementById('results-days').innerHTML = displayDay;
}

const getCurrentMonthLength = () => {
    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    const currentMonth = new Date().getMonth();
    return monthLength[currentMonth];
}