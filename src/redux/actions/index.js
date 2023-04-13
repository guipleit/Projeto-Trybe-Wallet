import { fetchExchange } from '../../helpers/fetchExchange';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  email: payload,
});

export const updateCurrencies = (payload) => ({
  type: UPDATE_CURRENCIES,
  currencies: payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(updateCurrencies(currencies));
};

export const addExpense = (expense) => async (dispatch) => {
  const exchangeRates = await dispatch(fetchExchange());
  expense.exchangeRates = exchangeRates;
  dispatch({
    type: ADD_EXPENSE,
    expense,
  });
};

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});
