import { useState } from 'react';

export default function PredictionForm() {
  const [AS, setAS] = useState(12.5);
  const [AC, setAC] = useState(4.0);
  const [CE, setCE] = useState(600);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ AS, AC, CE })
    });
    const data = await res.json();
    setResult(data.prediction);
  };

  return (
    <div>
      <h2>GPR Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>AS (mm): </label>
          <input type="number" value={AS} onChange={e => setAS(Number(e.target.value))}/>
        </div>
        <div>
          <label>AC: </label>
          <input type="number" value={AC} onChange={e => setAC(Number(e.target.value))}/>
        </div>
        <div>
          <label>CE (J): </label>
          <input type="number" value={CE} onChange={e => setCE(Number(e.target.value))}/>
        </div>
        <button type="submit">Predict</button>
      </form>
      {result !== null && <h3>Predicted Dependent Variable: {result.toFixed(6)}</h3>}
    </div>
  );
}
