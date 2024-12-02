//defining plans for all vehicle types
const vehiclePricing = {
    Cycle: { daily: 5, monthly: 100, yearly: 500 },
    MotorCycle: { daily: 10, monthly: 200, yearly: 1000 },
    FourWheeler: { daily: 20, monthly: 500, yearly: 3500 }
};

let employeeId = '';

//on entering name , this will run and create new emp id and unhide gender inputs
document.getElementById('fullName').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const name = this.value;
        if (name.length < 2 || /\d/.test(name)) {
            alert('Invalid name');
            return;
        }
        employeeId = 'EMP' + Math.floor(Math.random() * 10000);
        document.getElementById('registration-id').innerText = `Registration ID: ${employeeId}`;
        document.getElementById('registration-id').classList.remove('d-none');
        document.getElementById('gender-container').classList.remove('d-none');
        document.getElementById('gender-label').innerText = `Hi ${name}! Can I know your gender?`;
        this.classList.add('d-none');
    }
});

//on selecting gender , gender container will get hidden again and email input will get unhide
document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', function () {
        document.getElementById('email-container').classList.remove('d-none');
        document.getElementById('gender-container').classList.add('d-none');
    });
});

//After entering valid email password container will get displayed
document.getElementById('email').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const email = this.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Invalid email');
            return;
        }
        document.getElementById('password-container').classList.remove('d-none');
        this.classList.add('d-none');
    }
});

//on entering password , simultaneously it will check its strength and change border color accordingly
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    this.className = strength.className;
});

//on entering valid password , confirm password container will get displayed
document.getElementById('password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const password = this.value;
        if (!validatePassword(password)) {
            alert('Password does not meet requirements');
            return;
        }
        document.getElementById('confirm-password-container').classList.remove('d-none');
        this.classList.add('d-none');
    }
});

//on entering confirm and correct password, it will display contact container
document.getElementById('confirmPassword').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const confirmPassword = this.value;
        const password = document.getElementById('password').value;
        if (confirmPassword !== password) {
            alert('Passwords do not match');
            return;
        }
        document.getElementById('contact-container').classList.remove('d-none');
        this.classList.add('d-none');
    }
});

// after entering valid contact number register button will get visible
document.getElementById('contact').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const contact = this.value;
        if (!/^\d{9,}$/.test(contact)) {
            alert('Invalid contact number');
            return;
        }
        document.getElementById('register-button').classList.remove('d-none');
        this.classList.add('d-none');
    }
});

//on clicking register button employee registeration vehicle form will be visible and employee form will get hidden again
document.getElementById('register-button').addEventListener('click', function () {
    document.getElementById('vehicle-registration').classList.remove('d-none');
    document.getElementById('employee-registration').classList.add('d-none');
});

//On entering vehicle name , it will show vehicle type dropdown container
document.getElementById('vehicleName').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const vehicleName = this.value;
        document.getElementById('vehicle-type-container').classList.remove('d-none');
        this.classList.add('d-none');
    }
});

//On selecting vehicle type from dropdown , vehicle number input will get unhidden
document.getElementById('vehicleType').addEventListener('change', function () {
    document.getElementById('vehicle-number-container').classList.remove('d-none');
    document.getElementById('vehicle-type-container').classList.add('d-none');
});

//On entering vehicle number , employee id input will get visible
document.getElementById('vehicleNumber').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const vehicleNumber = this.value;
        document.getElementById('employee-id-container').classList.remove('d-none');
        this.classList.add('d-none');
    }
});

//on entering valid emp id , identification textarea will get visible
document.getElementById('employeeId').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const empId = this.value;
        if (empId !== employeeId) {
            alert('Invalid Employee ID');
            return;
        }
        document.getElementById('identification-container').classList.remove('d-none');
        this.classList.add('d-none');
    }
});

//after entering identification , all price plans will get visible for selected vehicle type
document.getElementById('identification').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('pass-pricing').classList.remove('d-none');
        this.classList.add('d-none');
        displayPricing();
    }
});


document.getElementById('get-pass').addEventListener('click', function () {
    const vehiclePricing = {
    Cycle: { daily: 5, monthly: 100, yearly: 500 },
    MotorCycle: { daily: 10, monthly: 200, yearly: 1000 },
    FourWheeler: { daily: 20, monthly: 500, yearly: 3500 }
    };
    const vehicleType = document.getElementById('vehicleType').value;
    const currency = document.getElementById('currency').value;
    const pricing = vehiclePricing[vehicleType];
    const passPrice = {
        daily: convertCurrency(pricing.daily, currency),
        monthly: convertCurrency(pricing.monthly, currency),
        yearly: convertCurrency(pricing.yearly, currency)
    };

    const passPriceDisplay = `
        <h4><strong>Converted Pass Pricing for ${vehicleType}:</strong></h4>
        <p>Daily Pass: ${passPrice.daily} ${currency}</p>
        <p>Monthly Pass: ${passPrice.monthly} ${currency}</p>
        <p>Yearly Pass: ${passPrice.yearly} ${currency}</p>
    `;

    document.getElementById('pass-price').innerHTML = passPriceDisplay;
    document.getElementById('pass-price').classList.remove('d-none');
    document.getElementById('ticket_and_plans').classList.remove('d-none');
});

document.getElementById('generate_ticket').addEventListener('click',function(){
    document.getElementById('employeeName').innerText = (document.getElementById('fullName').value);
    document.getElementById('employeeEmail').innerText = (document.getElementById('email').value);
    document.getElementById('employeeNumber').innerText = (document.getElementById('contact').value);
    document.getElementById('employeeIdTicket').innerText = (document.getElementById('employeeId').value);
    document.getElementById('vehicleTypeDisplay').innerText = (document.getElementById('vehicleType').value);
    document.getElementById('vehicleNameDisplay').innerText = (document.getElementById('vehicleName').value);
    document.getElementById('vehicleNumberDisplay').innerText = (document.getElementById('vehicleNumber').value);
    // 
    const vehicleType = document.getElementById('vehicleType').value;
    const pricing = vehiclePricing[vehicleType];
    const selectedCurrency = 'USD';
    const selectedPlan = document.getElementById('planSelectionDropdown').value;
    // Get the price based on the selected plan
    let planPrice;
    switch (selectedPlan) {
        case 'Daily':
            planPrice = convertCurrency(pricing, selectedCurrency).daily;
            break;
        case 'Monthly':
            planPrice = convertCurrency(pricing, selectedCurrency).monthly;
            break;
        case 'Yearly':
            planPrice = convertCurrency(pricing, selectedCurrency).yearly;
            break;
    }
    document.getElementById('selectedPlan').innerText = selectedPlan;
    document.getElementById('selectedPlanPricing').innerText = '$'+planPrice;
    // 
    document.getElementById('ticketsection').classList.remove('d-none');
});

function checkPasswordStrength(password) {
    let strength = { className: 'normal' };
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const lengthValid = password.length >= 8;

    if (hasUpperCase && hasLowerCase && hasNumbers && lengthValid && hasSpecialChars) {
        strength.className = 'border-success form-control';
    } else if (lengthValid) {
        strength.className = 'border-primary form-control';
    } else {
        strength.className = 'border-danger form-control';
    }
    return strength;
}

function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const lengthValid = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasNumbers && lengthValid;
}

function convertCurrency(amount, currency) {
    const conversionRates = {
        INR: 1,
        USD: 0.012, // Example conversion rate
        YEN: 1.3 // Example conversion rate
    };
    return (amount * conversionRates[currency]).toFixed(2);
}

function displayPricing() {
    const vehicleType = document.getElementById('vehicleType').value;
    const pricing = vehiclePricing[vehicleType];
    const pricingDisplay = `
        <p>Daily: ${pricing.daily} INR</p>
        <p>Monthly: ${pricing.monthly} INR</p>
        <p>Yearly: ${pricing.yearly} INR</p>
    `;
    document.getElementById('pricing').innerHTML = pricingDisplay;
}