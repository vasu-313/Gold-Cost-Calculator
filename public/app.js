// let num1 = prompt ("enter 1 gram gold cost")
// let num2 = prompt ("enter weight")
// let num3 = prompt ("karat")
// let num4 = 0.0416666667;

// let total = num1*num2*num3*num4;

// console.log(total);
document.addEventListener('DOMContentLoaded', () => {
    const num1 = document.querySelector("#num1");
    const num2 = document.querySelector("#num2");
    const num3 = document.querySelector("#num3");
    const button = document.querySelector("button");
    const costBox = document.querySelector("#costBox");
    const num4 = 0.0416666667;
    

    button.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission reload

        // Convert inputs to numbers, default to 0 if invalid
        const value1 = parseFloat(num1.value) || 0;
        const value2 = parseFloat(num2.value) || 0;
        const value3 = parseFloat(num3.value) || 0;

        if (value3 > 24) {
            alert("❗ Karat value must be 24 or less");
            num3.value = "";
            num3.focus();
            return; 
        }

        // Calculate cost and round to 2 decimal places
        const cost = value1 * value2 * value3 * num4;
        costBox.value = cost;

                // Format as Indian Rupees with currency symbol
                costBox.value = cost.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
    });
});
console.log(costBox);





// API

const API_KEY = CONFIG.API_KEY; // Get from config
const CACHE_DURATION = CONFIG.CACHE_DURATION;

const goldPriceElement = document.getElementById('gold-live-cost');

async function fetchGoldPrice() {
  try {
    const response = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=XAU&currencies=INR`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    // Convert price from per ounce to per gram (1 ounce = 31.1 grams)
    const pricePerGram = data.rates.INR / 31.1;
    
    const formattedPrice = pricePerGram.toFixed(2);

    goldPriceElement.innerText = `₹${formattedPrice}/gram`;

    num1.value = formattedPrice;

    return formattedPrice;

  } catch (error) {
    console.error('Error:', error);
    goldPriceElement.innerText = "Error";
    return null;
  }
}

// Example usage
fetchGoldPrice().then(price => {
  if (price) {
    console.log(`Current Gold Price: ₹${price}/gram`);
  }
});


// contact

function sendMail() {
  // Get input values
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("sub").value;

  // Validation check
  if (!name || !email || !subject) {
    alert("Please fill in all required fields!");
    return; // Stop the function if validation fails
  }

  // Proceed if validation passes
  let parms = {
    name: name,
    email: email,
    subject: subject
  };

  emailjs.send("service_0ge8t4q", "template_3vl0gfj", parms)
  .then(() => {
    alert("Email sent successfully!");
    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sub").value = "";

    window.location.href = "http://127.0.0.1:5500/index.html?#home";
  })
  .catch((error) => {
    alert("Failed to send email: " + error.text);
  });
}