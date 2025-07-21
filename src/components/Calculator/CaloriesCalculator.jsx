"use client";

import React, { useState } from "react";
//import "./Calculator.scss";

function CaloriesCalculator() {
  const [formData, setFormData] = useState({
    gender: "male",
    age: "",
    height: "",
    weight: "",
    activityLevel: "ne",
    goal: "mrsavljenje",
    caloriesResult: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const genderCoef = {
    male: 5,
    female: -161,
  };

  const activityCoef = {
    ne: 1.2,
    malo: 1.375,
    umereno: 1.55,
    veoma: 1.725,
    ekstremno: 1.9,
  };

  const goalCoef = {
    mrsavljenje: 0.85,
    Gojenje: 1.15,
    Odrzavanje: 1,
  };

  const calculateCalories = (event) => {
    event.preventDefault();
    console.log(formData);
    const bmrCurr =
      10 * formData.weight +
      6.25 * formData.height -
      5 * formData.age +
      genderCoef[formData.gender];
    const currResult =
      bmrCurr * activityCoef[formData.activityLevel] * goalCoef[formData.goal];

    setFormData({ ...formData, caloriesResult: currResult });
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        <h2 className="title">Calories Calculator</h2>
        <form onSubmit={calculateCalories} className="form">
          <div className="input-container">
            <div className="input-group">
              <label>Godine *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Visina (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Težina (kg) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
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
              <label>Nivo aktivnosti *</label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                required
              >
                <option value="ne">Neaktivan</option>
                <option value="malo">Malo aktivan</option>
                <option value="umereno">Umereno aktivan</option>
                <option value="veoma">Veoma aktivan</option>
                <option value="ekstremno">Ekstremno aktivan</option>
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
                <option value="mrsavljenje">Mršavljenje</option>
                <option value="Gojenje">Gojenje</option>
                <option value="Odrzavanje">Održavanje</option>
              </select>
            </div>
          </div>
          <button type="submit">Izračunaj kalorije</button>
        </form>
        {formData.caloriesResult && (
          <h3 className="result">
            Tvoje dnevne kalorije: {formData.caloriesResult.toFixed(2)}{" "}
            kalorije/dan
          </h3>
        )}
      </div>
    </div>
  );
}

export default CaloriesCalculator;
