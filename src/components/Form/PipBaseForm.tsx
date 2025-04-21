import { useState } from "react";
import { Currency, currencyInfo } from "../../lib/currencies";

const Form = () => {
  const [lotSize, setLotSize] = useState<number>(0.01);
  const [stopLossPips, setStopLossPips] = useState<number>(10);
  const [takeProfitPips, setTakeProfitPips] = useState<number>(20);
  const [lossValue, setLossValue] = useState<number | null>(null);
  const [profitValue, setProfitValue] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("EURUSD");

  // Currency information with pip values for 1.0 standard lot

  const calculateValues = (e: React.FormEvent) => {
    e.preventDefault();
    // Get the base pip value for the selected currency
    const basePipValue = currencyInfo[selectedCurrency].pipValue;

    // Calculate pip value based on lot size
    const pipValue = basePipValue * lotSize;

    // Calculate total loss and profit values
    const totalLoss = pipValue * stopLossPips;
    const totalProfit = pipValue * takeProfitPips;

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
          htmlFor="stopLoss"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Stop Loss (pips)
        </label>
        <input
          type="number"
          id="stopLoss"
          value={stopLossPips}
          onChange={(e) => setStopLossPips(parseFloat(e.target.value))}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          required
          aria-label="Stop loss in pips"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="takeProfit"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Take Profit (pips)
        </label>
        <input
          type="number"
          id="takeProfit"
          value={takeProfitPips}
          onChange={(e) => setTakeProfitPips(parseFloat(e.target.value))}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          required
          aria-label="Take profit in pips"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Calculate
      </button>

      {lossValue !== null && profitValue !== null && (
        <div className="mt-5 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Currency: <strong>{currencyInfo[selectedCurrency].name}</strong>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Pip Value:{" "}
            <strong>
              ${(currencyInfo[selectedCurrency].pipValue * lotSize).toFixed(2)}{" "}
              USD
            </strong>
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
