export type Currency =
  | "EURUSD"
  | "GBPUSD"
  | "USDJPY"
  | "AUDUSD"
  | "USDCAD"
  | "USDCHF"
  | "EURGBP"
  | "EURJPY"
  | "GBPJPY"
  | "NZDUSD"
  | "EURCHF"
  | "AUDJPY"
  | "GBPCAD"
  | "GBPCHF"
  | "EURAUD"
  | "CADJPY"
  | "CHFJPY"
  | "AUDCAD"
  | "AUDCHF"
  | "AUDNZD"
  | "NZDJPY"
  | "EURNZD"
  | "CADCHF"
  | "NZDCAD"
  | "NZDCHF";

export interface CurrencyInfo {
  name: string;
  pipValue: number; // Base pip value for 1.0 lot
  pipDecimal: number; // Decimal places for 1 pip (4 for most, 2 for JPY pairs)
}
export const currencyInfo: Record<Currency, CurrencyInfo> = {
  EURUSD: { name: "EUR/USD", pipValue: 10, pipDecimal: 4 },
  GBPUSD: { name: "GBP/USD", pipValue: 10, pipDecimal: 4 },
  USDJPY: { name: "USD/JPY", pipValue: 9.13, pipDecimal: 2 },
  AUDUSD: { name: "AUD/USD", pipValue: 10, pipDecimal: 4 },
  USDCAD: { name: "USD/CAD", pipValue: 7.54, pipDecimal: 4 },
  USDCHF: { name: "USD/CHF", pipValue: 10.64, pipDecimal: 4 },
  EURGBP: { name: "EUR/GBP", pipValue: 13.15, pipDecimal: 4 },
  EURJPY: { name: "EUR/JPY", pipValue: 9.13, pipDecimal: 2 },
  GBPJPY: { name: "GBP/JPY", pipValue: 9.13, pipDecimal: 2 },
  NZDUSD: { name: "NZD/USD", pipValue: 10, pipDecimal: 4 },
  EURCHF: { name: "EUR/CHF", pipValue: 10.64, pipDecimal: 4 },
  AUDJPY: { name: "AUD/JPY", pipValue: 9.13, pipDecimal: 2 },
  GBPCAD: { name: "GBP/CAD", pipValue: 7.54, pipDecimal: 4 },
  GBPCHF: { name: "GBP/CHF", pipValue: 10.64, pipDecimal: 4 },
  EURAUD: { name: "EUR/AUD", pipValue: 10, pipDecimal: 4 },
  CADJPY: { name: "CAD/JPY", pipValue: 9.13, pipDecimal: 2 },
  CHFJPY: { name: "CHF/JPY", pipValue: 9.13, pipDecimal: 2 },
  AUDCAD: { name: "AUD/CAD", pipValue: 7.54, pipDecimal: 4 },
  AUDCHF: { name: "AUD/CHF", pipValue: 10.64, pipDecimal: 4 },
  AUDNZD: { name: "AUD/NZD", pipValue: 10, pipDecimal: 4 },
  NZDJPY: { name: "NZD/JPY", pipValue: 9.13, pipDecimal: 2 },
  EURNZD: { name: "EUR/NZD", pipValue: 10, pipDecimal: 4 },
  CADCHF: { name: "CAD/CHF", pipValue: 10.64, pipDecimal: 4 },
  NZDCAD: { name: "NZD/CAD", pipValue: 7.54, pipDecimal: 4 },
  NZDCHF: { name: "NZD/CHF", pipValue: 10.64, pipDecimal: 4 },
};
