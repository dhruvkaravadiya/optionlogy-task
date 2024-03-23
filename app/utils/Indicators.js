// Function to calculate RSI (Relative Strength Index)
export const calculateRSI = (data) => {
    const rsiValues = [];
    for (let i = 0; i < data.length; i++) {
        if (i >= 13) {
            const closePrices = data
                .slice(i - 13, i + 1)
                .map((item) => parseFloat(item["4. close"]));
            const gains = [];
            const losses = [];
            for (let j = 1; j < closePrices.length; j++) {
                const diff = closePrices[j] - closePrices[j - 1];
                if (diff > 0) {
                    gains.push(diff);
                    losses.push(0);
                } else {
                    gains.push(0);
                    losses.push(Math.abs(diff));
                }
            }
            const avgGain = gains.reduce((sum, value) => sum + value, 0) / 14;
            const avgLoss = losses.reduce((sum, value) => sum + value, 0) / 14;
            const rs = avgGain / avgLoss;
            const rsi = 100 - 100 / (1 + rs);
            rsiValues.push(rsi);
        } else {
            rsiValues.push(null);
        }
    }
    return rsiValues;
};

// Function to calculate ADX (Average Directional Index)
export const calculateADX = (data) => {
    const adxValues = [];
    for (let i = 0; i < data.length; i++) {
        if (i >= 13) {
            const trueRangeValues = [];
            const directionalMovement = [];
            for (let j = i - 13; j < i; j++) {
                const prevClose = parseFloat(data[j]["4. close"]);
                const high = parseFloat(data[j]["2. high"]);
                const low = parseFloat(data[j]["3. low"]);
                const highLow = high - low;
                const highClose = Math.abs(high - prevClose);
                const lowClose = Math.abs(low - prevClose);
                const trueRange = Math.max(highLow, highClose, lowClose);
                trueRangeValues.push(trueRange);
                const upMove = high - parseFloat(data[j + 1]["2. high"]);
                const downMove = parseFloat(data[j + 1]["3. low"]) - low;
                directionalMovement.push({ up: upMove, down: downMove });
            }
            const averageTrueRange =
                trueRangeValues.reduce((sum, value) => sum + value, 0) / 14;
            const positiveDM =
                directionalMovement.reduce(
                    (sum, move) =>
                        sum +
                        (move.up > move.down && move.up > 0 ? move.up : 0),
                    0
                ) / 14;
            const negativeDM =
                directionalMovement.reduce(
                    (sum, move) =>
                        sum +
                        (move.down > move.up && move.down > 0 ? move.down : 0),
                    0
                ) / 14;
            const positiveDI = (positiveDM / averageTrueRange) * 100;
            const negativeDI = (negativeDM / averageTrueRange) * 100;
            const dx =
                Math.abs(
                    (positiveDI - negativeDI) / (positiveDI + negativeDI)
                ) * 100;
            adxValues.push(dx);
        } else {
            adxValues.push(null);
        }
    }
    return adxValues;
};
export const calculateAroon = (data) => {
    const aroonValues = [];
    for (let i = 0; i < data.length; i++) {
        if (i >= 25) {
            const startIndex = i - 25;
            const highValues = data
                .slice(startIndex, i + 1)
                .map((item) => parseFloat(item["2. high"]));
            const lowValues = data
                .slice(startIndex, i + 1)
                .map((item) => parseFloat(item["3. low"]));
            const highIndex = highValues.indexOf(Math.max(...highValues));
            const lowIndex = lowValues.indexOf(Math.min(...lowValues));
            const highAroon = ((25 - (i - startIndex - highIndex)) / 25) * 100;
            const lowAroon = ((25 - (i - startIndex - lowIndex)) / 25) * 100;
            aroonValues.push({ high: highAroon, low: lowAroon });
        } else {
            aroonValues.push({ high: null, low: null });
        }
    }
    return aroonValues;
};
export const calculateSMA = (data) => {
    const smaValues = [];
    for (let i = 0; i < data.length; i++) {
        const startIndex = Math.max(0, i - 29);
        const sum = data
            .slice(startIndex, i + 1)
            .reduce((acc, item) => acc + parseFloat(item["4. close"]), 0);
        smaValues.push(sum / Math.min(i + 1, 30));
    }
    return smaValues;
};
