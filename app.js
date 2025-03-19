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