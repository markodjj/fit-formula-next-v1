"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

//import "./Calculator.scss";

function BMRCalculator() {
  const [formData, setFormData] = useState({
    gender: "male",
    age: "",
    height: "",
    weight: "",
    bmrResult: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateBMR = (event) => {
    event.preventDefault();

    let calculatedBMR;
    if (formData.gender === "male") {
      calculatedBMR =
        10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;
    } else {
      calculatedBMR =
        10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;
    }

    setFormData({ ...formData, bmrResult: calculatedBMR });
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        <h2 className="title font-bold">BMR Kalkulator</h2>
        <form
          data-test="bmr-calculator-form"
          onSubmit={calculateBMR}
          className="form"
          id="form"
        >
          <div className="input-container">
            <div className="input-group">
              <label>Pol *</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option name="male" value="male">
                  Muški
                </option>
                <option name="female" value="female">
                  Ženski
                </option>
              </select>
            </div>
            <div className="input-group">
              <label>Godine starosti *</label>
              <input
                type="number"
                name="age"
                id="age"
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
                id="height"
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
                id="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* <button type="submit">Izračunaj</button> */}
          <Button>Izracunajk</Button>
        </form>
        {/* className="text-xl font-semibold text-blue-700" */}
        {/* className="text-gray-700" */}
        {formData.bmrResult && (
          <div data-test="bmr-result" id="bmr-result" className="result">
            <p>BMR: {formData.bmrResult.toFixed(2)}</p>
          </div>
        )}

        {/* <p className="mt-4 text-sm text-gray-500">
          * Kako bi izračunao realan broj kalorija koji treba da uneseš, nastavi dole sa unosom podataka.
        </p> */}
      </div>
    </div>
  );
}

export default BMRCalculator;
