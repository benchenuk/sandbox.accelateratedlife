
import { calculateWeights } from '../src/math.js';
import assert from 'assert';

console.log("Running Math Tests...");

// Test 1: Sum to 1
try {
    const weights = calculateWeights(80);
    const sum = weights.reduce((a, b) => a + b, 0);
    // Allow small float error
    assert(Math.abs(1 - sum) < 0.000001, `Sum should be ~1.0, got ${sum}`);
    console.log("✅ Sum to 1 passed");
} catch (e) {
    console.error("❌ Sum to 1 failed:", e.message);
}

// Test 2: Monotonic Decrease
try {
    const weights = calculateWeights(80);
    let isDecreasing = true;
    for (let i = 1; i < weights.length; i++) {
        if (weights[i] > weights[i - 1]) {
            isDecreasing = false;
            console.error(`Index ${i} (${weights[i]}) is larger than ${i - 1} (${weights[i - 1]})`);
            break;
        }
    }
    assert(isDecreasing, "Weights should monotonically decrease");
    console.log("✅ Monotonic decrease passed");
} catch (e) {
    console.error("❌ Monotonic decrease failed:", e.message);
}

// Test 3: Logarithmic property check (visual check of values)
const w = calculateWeights(5, 2); // 5 items, steepness 2
console.log("Sample weights for 5 items:", w.map(x => (x * 100).toFixed(2) + '%'));
// Expect: [Largest, ..., Smallest]
