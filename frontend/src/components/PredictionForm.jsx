import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PredictionForm() {
  const [AS, setAS] = useState("");
  const [AC, setAC] = useState("");
  const [CE, setCE] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8000/predict", {
        AS,
        AC,
        CE,
      });
      setResult(res.data.prediction);
    } catch (err) {
      console.error(err);
      toast.error("Error making prediction", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-16 p-8 bg-gray-100 shadow-lg rounded-2xl">
      {/* Catchy title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Predict Porosity with GPR
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">AS (mm)</label>
          <input
            type="number"
            value={AS}
            onChange={(e) => setAS(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">AC</label>
          <input
            type="number"
            value={AC}
            onChange={(e) => setAC(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">CE (J)</label>
          <input
            type="number"
            value={CE}
            onChange={(e) => setCE(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Gradient Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-bold shadow-lg text-white transition-all duration-300 ${loading
              ? "bg-gradient-to-r from-sky-400 via-sky-200 to-sky-600 cursor-not-allowed"
              : "bg-gradient-to-r from-sky-600 via-sky-400 to-sky-500 hover:from-indigo-600 hover:to-blue-600"
            }`}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {/* Result */}
      {result !== null && (
        <div className="mt-8 p-6 bg-gray-300 rounded-xl text-center animate-fadeIn">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
            Porosity
          </h3>
          <p className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-sky-500">
            {result.toFixed(6)}
          </p>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default PredictionForm;