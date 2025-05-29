document.addEventListener('DOMContentLoaded', () => {
  const num1 = document.querySelector("#num1"); // 1 Gram Gold Cost
  const num2 = document.querySelector("#num2"); // Weight
  const num3 = document.querySelector("#num3"); // Karat
  const num4 = document.getElementById('num4'); // Percentage
  const button = document.querySelector("button");
  const costBox = document.querySelector("#costBox");
  const num5 = 1 / 24; // For Karat calculation

  // === Focus Blur Handling ===
  let lastFocusedInput = num3; // Default focus on karat

  // Default state: blur percentage
  num3.style.filter = 'none';
  num4.style.filter = 'blur(3px)';

  num3.addEventListener('focus', () => {
    lastFocusedInput = num3;
    num3.style.filter = 'none';
    num4.style.filter = 'blur(3px)';
  });

  num4.addEventListener('focus', () => {
    lastFocusedInput = num4;
    num4.style.filter = 'none';
    num3.style.filter = 'blur(3px)';
  });

  const clearBlurIfNoneFocused = () => {
    setTimeout(() => {
      if (document.activeElement !== num3 && document.activeElement !== num4) {
        if (lastFocusedInput === num3) {
          num3.style.filter = 'none';
          num4.style.filter = 'blur(3px)';
        } else {
          num4.style.filter = 'none';
          num3.style.filter = 'blur(3px)';
        }
      }
    }, 100);
  };

  num3.addEventListener('blur', clearBlurIfNoneFocused);
  num4.addEventListener('blur', clearBlurIfNoneFocused);

  // === Calculation Logic ===
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const value1 = parseFloat(num1.value.replace(/[^\d.]/g, '')) || 0;
    const value2 = parseFloat(num2.value.replace(/[^\d.]/g, '')) || 0;
    const value3 = parseFloat(num3.value.replace(/[^\d.]/g, '')) || 0;
    const value4 = parseFloat(num4.value.replace(/[^\d.]/g, '')) || 0;

    if (value3 > 24) {
      alert("❗ Karat value must be 24 or less");
      num3.value = "";
      num3.focus();
      return;
    }

    if (value4 > 100) {
      alert("❗ Percentage value must be 100 or less");
      num4.value = "";
      num4.focus();
      return;
    }

    let factor = 0;
    if (lastFocusedInput === num3) {
      factor = value3 / 24;
    } else if (lastFocusedInput === num4) {
      factor = value4 / 100;
    } else {
      alert("Please select either Karat or Percentage input.");
      return;
    }

    const cost = value1 * value2 * factor;
    costBox.value = cost.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  });

  // === Fetch Gold Price ===
  const API_KEY = CONFIG.API_KEY;
  const goldPriceElement = document.getElementById('gold-live-cost');

  async function fetchGoldPrice() {
    try {
      const response = await fetch(
        `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=XAU&currencies=INR`
      );

      if (!response.ok) throw new Error('Failed to fetch gold price');

      const data = await response.json();
      const pricePerGram = data.rates.INR / 31.1;
      const formattedPrice = pricePerGram.toFixed(2);

      goldPriceElement.innerText = `₹${formattedPrice}/gram`;
      num1.value = formattedPrice;
    } catch (error) {
      console.error('Error fetching gold price:', error);
      goldPriceElement.innerText = "Error";
    }
  }

  fetchGoldPrice();

  // === Contact Form ===
  window.sendMail = function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("sub").value;

    if (!name || !email || !subject) {
      alert("Please fill in all required fields!");
      return;
    }

    const parms = { name, email, subject };

    emailjs.send("service_0ge8t4q", "template_3vl0gfj", parms)
      .then(() => {
        alert("Email sent successfully!");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("sub").value = "";
        window.location.href = "http://127.0.0.1:5500/index.html?#home";
      })
      .catch(error => {
        alert("Failed to send email: " + error.text);
      });
  };
});




  // 🟡 Format input with prefix/suffix
  function formatWithSuffix(input, affix, isPrefix = false) {
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let value = input.value.replace(/[^\d.]/g, '');
        if (value) {
          input.value = isPrefix ? `${affix}${value}` : `${value}${affix}`;
        } else {
          input.value = "";
        }
      }, 500);
    });
    input.addEventListener('focus', () => {
      input.value = input.value.replace(/[^\d.]/g, '');
    });
  }

  // 🟢 Attach formatting
  formatWithSuffix(num1, '₹', true);  // Prefix
  formatWithSuffix(num2, 'g');        // Suffix
  formatWithSuffix(num3, 'K');        // Suffix
  formatWithSuffix(num4, '%');        // Suffix




const menuIcon = document.getElementById("menu-icon");
const sideMenu = document.getElementById("side-menu");
const closeBtn = document.getElementById("close-menu");

menuIcon.addEventListener("click", () => {
    sideMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("active");
});

function closeMenu() {
    sideMenu.classList.remove("active");
}
