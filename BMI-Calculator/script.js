function calculateBMI() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    if(weight > 0 && height > 0) {
        let bmi = weight / (height * height);
        document.getElementById("bmiResult").innerText = `Your BMI is ${bmi.toFixed(2)}`;
    } else {
        document.getElementById("bmiResult").innerText = "Please enter valid values.";
    }
}