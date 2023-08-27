const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertedAmountInput = document.getElementById('convertedAmount');
const convertButton = document.getElementById('convertBtn');
import countries from './countriesMap.js';

// Fetch list of currencies and populate dropdowns
fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currencyCode => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.text = countries[currencyCode];
            option2.text = countries[currencyCode];
            option1.value = currencyCode;
            option2.value = currencyCode;
            fromCurrencySelect.add(option1);
            toCurrencySelect.add(option2);
        });
    });

// Conversion function
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const conversionRate = data.rates[toCurrency];
            const convertedAmount = (amount * conversionRate).toFixed(2);
            convertedAmountInput.value = convertedAmount;
        })
        .catch(error => console.error(error));
}

convertButton.addEventListener('click', convertCurrency);

