/**
 * Non-Linear Time Math Module
 */

/**
 * Calculates normalized weights for a sequence of items based on logarithmic decay.
 * The theory is that time feels faster as you get older.
 * Formula: Weight ~ 1 / log(t + k)
 * 
 * @param {number} totalItems - Total number of units (e.g., 80 years)
 * @param {number} steepness - A factor to control how fast it shrinks. Higher = less dramatic.
 * @returns {number[]} - Array of weights summing to 1.0
 */
export function calculateWeights(totalItems, steepness = 5) {
    if (totalItems <= 0) return [];

    let rawWeights = [];
    let totalRaw = 0;

    for (let t = 1; t <= totalItems; t++) {
        // We add 'steepness' to t to avoid log(1)=0 and extreme initial drop-off
        // A standard log decay: 1 / Math.log(t + steepness)
        // If steepness is small (e.g. 1), the difference between t=1 and t=2 is huge.
        // If steepness is large (e.g. 10), the curve is flatter.
        const w = 1 / Math.log(t + steepness);
        rawWeights.push(w);
        totalRaw += w;
    }

    // Normalize so they sum to 1
    return rawWeights.map(w => w / totalRaw);
}

/**
 * Helper to get a percentage string for CSS
 */
export function getPercentage(weight) {
    return (weight * 100).toFixed(4) + '%';
}
