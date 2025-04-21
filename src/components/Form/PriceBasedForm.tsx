import { useState } from "react";
import { Currency, currencyInfo } from "../../lib/currencies";
const Form = () => {
  const [lotSize, setLotSize] = useState<number>(0.01);
  const [marketPrice, setMarketPrice] = useState<number>(1.0);
  const [stopLossPrice, setStopLossPrice] = useState<number>(0.99);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(1.01);
  const [stopLossPips, setStopLossPips] = useState<number | null>(null);
  const [takeProfitPips, setTakeProfitPips] = useState<number | null>(null);
  const [lossValue, setLossValue] = useState<number | null>(null);
  const [profitValue, setProfitValue] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("EURUSD");
  const [tradeDirection, setTradeDirection] = useState<"buy" | "sell">("buy");

  const calculateValues = (e: React.FormEvent) => {
    e.preventDefault();

    // Get the pip decimal for the selected currency
    const pipDecimal = currencyInfo[selectedCurrency].pipDecimal;
    const pipMultiplier = Math.pow(10, pipDecimal);

    // Calculate pips based on price difference
    let slPips: number;
    let tpPips: number;

    if (tradeDirection === "buy") {
      // For buy: SL is below market price, TP is above
      slPips = Math.abs((marketPrice - stopLossPrice) * pipMultiplier);
      tpPips = Math.abs((takeProfitPrice - marketPrice) * pipMultiplier);
    } else {
      // For sell: SL is above market price, TP is below
      slPips = Math.abs((stopLossPrice - marketPrice) * pipMultiplier);
      tpPips = Math.abs((marketPrice - takeProfitPrice) * pipMultiplier);
    }

    // Get the base pip value for the selected currency
    const basePipValue = currencyInfo[selectedCurrency].pipValue;

    // Calculate pip value based on lot size
    const pipValue = basePipValue * lotSize;

    // Calculate total loss and profit values
    const totalLoss = pipValue * slPips;
    const totalProfit = pipValue * tpPips;

    setStopLossPips(slPips);
    setTakeProfitPips(tpPips);
    setLossValue(totalLoss);
    setProfitValue(totalProfit);
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={calculateValues}>
      <div className="mb-5">
        <label
          htmlFor="currency"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Currency Pair
        </label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          aria-label="Currency pair selection"
        >
          {Object.entries(currencyInfo).map(([currency, info]) => (
            <option key={currency} value={currency}>
              {info.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label
          htmlFor="tradeDirection"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Trade Direction
        </label>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="buyDirection"
              name="tradeDirection"
              value="buy"
              checked={tradeDirection === "buy"}
              onChange={() => setTradeDirection("buy")}
              className="mr-2"
            />
            <label
              htmlFor="buyDirection"
              className="text-sm text-gray-900 dark:text-white"
            >
              Buy
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="sellDirection"
              name="tradeDirection"
              value="sell"
              checked={tradeDirection === "sell"}
              onChange={() => setTradeDirection("sell")}
              className="mr-2"
            />
            <label
              htmlFor="sellDirection"
              className="text-sm text-gray-900 dark:text-white"
            >
              Sell
            </label>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor="lotSize"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Lot Size
        </label>
        <input
          type="number"
          id="lotSize"
          step="0.01"
          min="0.01"
          value={lotSize}
          onChange={(e) => setLotSize(parseFloat(e.target.value))}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          placeholder="0.01"
          required
          aria-label="Trading lot size"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="marketPrice"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Market Price
        </label>
        <input
          type="number"
          id="marketPrice"
          step="0.00001"
          value={marketPrice}
          onChange={(e) => setMarketPrice(parseFloat(e.target.value))}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          required
          aria-label="Current market price"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="stopLossPrice"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Stop Loss Price
        </label>
        <input
          type="number"
          id="stopLossPrice"
          step="0.00001"
          value={stopLossPrice}
          onChange={(e) => setStopLossPrice(parseFloat(e.target.value))}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          required
          aria-label="Stop loss price"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="takeProfitPrice"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Take Profit Price
        </label>
        <input
          type="number"
          id="takeProfitPrice"
          step="0.00001"
          value={takeProfitPrice}
          onChange={(e) => setTakeProfitPrice(parseFloat(e.target.value))}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          required
          aria-label="Take profit price"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Calculate
      </button>

      {stopLossPips !== null &&
        takeProfitPips !== null &&
        lossValue !== null &&
        profitValue !== null && (
          <div className="mt-5 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Currency: <strong>{currencyInfo[selectedCurrency].name}</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Direction:{" "}
              <strong>{tradeDirection === "buy" ? "Buy" : "Sell"}</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Pip Value:{" "}
              <strong>
                $
                {(currencyInfo[selectedCurrency].pipValue * lotSize).toFixed(2)}{" "}
                USD
              </strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Stop Loss: <strong>{stopLossPips.toFixed(1)} pips</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Take Profit: <strong>{takeProfitPips.toFixed(1)} pips</strong>
            </p>
            <p className="text-red-600 dark:text-red-400 mb-2">
              Potential Loss: <strong>${lossValue.toFixed(2)} USD</strong>
            </p>
            <p className="text-green-600 dark:text-green-400">
              Potential Profit: <strong>${profitValue.toFixed(2)} USD</strong>
            </p>
          </div>
        )}
    </form>
  );
};

export default Form;
