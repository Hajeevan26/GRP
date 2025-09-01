require('dotenv').config();

// Load hyperparameters from .env
const L = parseFloat(process.env.L);
const sF = parseFloat(process.env.sF);
const beta = process.env.BETA.split(',').map(Number);
const mu = process.env.MU.split(',').map(Number);
const sg = process.env.SG.split(',').map(Number);

function predictGPR(input, A, Z) {
  const [AS, AC, CE] = input;

  // Standardize input
  const x = [(AS - mu[0])/sg[0], (AC - mu[1])/sg[1], (CE - mu[2])/sg[2]];

  // Linear basis
  const f0 = beta[0] + beta[1]*x[0] + beta[2]*x[1] + beta[3]*x[2];

  // Compute distances to active set
  const r = Z.map(zRow => Math.sqrt(zRow.reduce((sum, zi, i) => sum + (zi - x[i])**2, 0)));

  // Kernel
  const k = r.map(ri => sF**2 * Math.exp(-ri / L));

  // Weighted sum
  const y = f0 + k.reduce((sum, ki, i) => sum + ki * A[i], 0);

  return y;
}

module.exports = { predictGPR };
