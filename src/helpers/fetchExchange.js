export const fetchExchange = () => async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const exchangeRates = data;
  return exchangeRates;
};