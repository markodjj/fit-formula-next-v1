"use client";

import React, { useState } from "react";
//import "./Calculator.scss";

function TDEECalculator() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activityLevel: "inactive",
    goal: "maintenance",
  });

  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [caloriesNeeded, setCaloriesNeeded] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateTDEE = (event) => {
    event.preventDefault();

    const { age, weight, height, gender, activityLevel, goal } = formData;

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    const activityMap = {
      inactive: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extreme: 1.9,
    };

    const activityNum = activityMap[activityLevel];

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) || !activityNum) {
      alert("Unesite ispravne podatke.");
      return;
    }

    let calculatedBMR;
    if (gender === "male") {
      calculatedBMR = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      calculatedBMR = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    setBmr(calculatedBMR);

    const calculatedTDEE = calculatedBMR * activityNum;
    setTdee(calculatedTDEE);

    let dailyCalories;
    if (goal === "maintenance") {
      dailyCalories = calculatedTDEE;
    } else if (goal === "slimming") {
      dailyCalories = calculatedTDEE * 0.85;
    } else if (goal === "gaining") {
      dailyCalories = calculatedTDEE * 1.1;
    }

    setCaloriesNeeded(dailyCalories);
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        <h2 className="title">TDEE Calculator</h2>
        <form
          data-test="tdee-calculator-form"
          onSubmit={calculateTDEE}
          className="form"
        >
          <div className="input-container">
            <div className="input-group">
              <label>Pol *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Muški</option>
                <option value="female">Ženski</option>
              </select>
            </div>

            <div className="input-group">
              <label>Godine *</label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Visina (cm) *</label>
              <input
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Težina (kg) *</label>
              <input
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Nivo aktivnosti *</label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                required
              >
                <option value="inactive">Neaktivan</option>
                <option value="light">Malo aktivan</option>
                <option value="moderate">Umereno aktivan</option>
                <option value="very">Veoma aktivan</option>
                <option value="extreme">Ekstremno aktivan</option>
              </select>
            </div>

            <div className="input-group">
              <label>Cilj *</label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
              >
                <option value="maintenance">Održavanje</option>
                <option value="slimming">Mršavljenje</option>
                <option value="gaining">Gojenje</option>
              </select>
            </div>
          </div>

          <button type="submit">Izračunaj TDEE i Kalorije</button>
        </form>

        {bmr && (
          <h3 data-test="bmr-result" className="result">
            Tvoj BMR: {bmr.toFixed(2)} kalorija/dan
          </h3>
        )}
        {tdee && (
          <h3 data-test="tdee-result" className="result">
            Tvoj TDEE: {tdee.toFixed(2)} kalorija/dan
          </h3>
        )}
        {caloriesNeeded && (
          <h3 className="result">
            Dnevni unos za cilj ({formData.goal}): {caloriesNeeded.toFixed(2)}{" "}
            kalorija/dan
          </h3>
        )}
      </div>
    </div>
  );
}

export default TDEECalculator;
