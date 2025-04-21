import { useState } from "react";
import PipBaseForm from "./components/Form/PipBaseForm";
import PriceBasedForm from "./components/Form/PriceBasedForm";

export default function App() {
  const [activeTab, setActiveTab] = useState<"pip" | "price">("pip");

  return (
    <div className="p-12 flex flex-col items-center h-screen bg-slate-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-sm mb-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-2 px-4 w-1/2 text-center ${
              activeTab === "pip"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("pip")}
          >
            Pip Based
          </button>
          <button
            className={`py-2 px-4 w-1/2 text-center ${
              activeTab === "price"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("price")}
          >
            Price Based
          </button>
        </div>
      </div>

      {activeTab === "pip" ? <PipBaseForm /> : <PriceBasedForm />}
    </div>
  );
}
