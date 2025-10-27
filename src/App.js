// src/App.js
import React, { useState } from "react";
import "./App.css";

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  function calc(e) {
    e.preventDefault();
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) { setResult("Enter valid numbers"); return; }
    const bmi = w / (h * h);
    setResult(`BMI: ${bmi.toFixed(1)} (${bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese"})`);
  }

  return (
    <div>
      <h2>BMI Calculator</h2>
      <form onSubmit={calc}>
        <input placeholder="Height cm" value={height} onChange={e=>setHeight(e.target.value)} />
        <input placeholder="Weight kg" value={weight} onChange={e=>setWeight(e.target.value)} />
        <button type="submit">Calculate</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

function FormValidation() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    return e;
  }

  function submit(e) {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length === 0) alert("Form submitted: " + JSON.stringify(form));
  }

  return (
    <div>
      <h2>Simple Form Validation</h2>
      <form onSubmit={submit}>
        <div>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          {errors.name && <div style={{color:'red'}}>{errors.name}</div>}
        </div>
        <div>
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          {errors.email && <div style={{color:'red'}}>{errors.email}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div style={{padding:20}}>
      <h1>React Lab: Form + BMI</h1>
      <FormValidation />
      <hr />
      <BMI />
    </div>
  );
}
