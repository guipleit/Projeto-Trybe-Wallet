import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux, renderWithRedux } from './renderWith';
import App from '../../App';
import Header from '../../components/Header';
import Login from '../../pages/Login';
import Table from '../../components/Table';

describe('Testes de rota', () => {
  it('testa se é renderizada a página de Login no caminho /', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const loginHeader = screen.getByText(/Login/i);
    expect(loginHeader).toBeInTheDocument();
  });

  it('testa se é renderizada a página de Wallet no caminho /carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const walletHeader = screen.getByText(/BRL/i);
    expect(walletHeader).toBeInTheDocument();
  });
});

describe('Testes do componente Login', () => {
  it('testa se ao digitar um email incorreto e uma senha correta o botão permanece desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByLabelText(/Senha:/i);
    const button = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(emailInput, 'email_incorreto');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();
  });

  it('testa se ao digitar um email correto e uma senha correta o botão fica habilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByLabelText(/Senha:/i);
    const button = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(emailInput, 'email@correto.com');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeEnabled();
  });
});

describe('Testes do componente Header', () => {
  const email = 'test@example.com';

  it('testa se o email é renderizado corretamente', () => {
    const initialState = {
      user: { email },
      wallet: { expenses: [] },
    };
    renderWithRedux(<Header />, { initialState });
    const emailField = screen.getByTestId('email-field');
    expect(emailField).toHaveTextContent(email);
  });

  it('testa se calcula o valor total corretamente', () => {
    const initialState = {
      user: { email },
      wallet: {
        expenses: [
          {
            id: 0,
            value: '10',
            description: 'Test',
            currency: 'USD',
            method: 'cash',
            tag: 'food',
            exchangeRates: {
              USD: { ask: 5 },
            },
          },
          {
            id: 1,
            value: '20',
            description: 'Test 2',
            currency: 'USD',
            method: 'credit_card',
            tag: 'work',
            exchangeRates: {
              USD: { ask: 5 },
            },
          },
        ],
      },
    };
    renderWithRedux(<Header />, { initialState });
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toHaveTextContent('150.00');
  });

  it('testa se é mostrada a moeda correta', () => {
    const initialState = {
      user: { email },
      wallet: { expenses: [] },
    };
    renderWithRedux(<Header />, { initialState });
    const headerCurrencyField = screen.getByTestId('header-currency-field');
    expect(headerCurrencyField).toHaveTextContent('BRL');
  });
});

describe('Testes do componente Table', () => {
  const email = 'test@example.com';
  const initialState = {
    user: { email },
    wallet: {
      expenses: [
        {
          id: 0,
          value: '10',
          description: 'Test',
          currency: 'USD',
          method: 'cash',
          tag: 'food',
          exchangeRates: {
            USD: { ask: 5, name: 'United States Dollar' },
          },
        },
      ],
    },
  };

  it('testa se a tabela é renderizada corretamente', () => {
    renderWithRedux(<Table />, { initialState });
    const descriptionCell = screen.getByText(/Test/i);
    expect(descriptionCell).toBeInTheDocument();
  });

  it('testa se os valores são exibidos corretamente', () => {
    renderWithRedux(<Table />, { initialState });
    const valueCell = screen.getByText(/10.00/i);
    expect(valueCell).toBeInTheDocument();
  });

  it('testa se o botão Editar/Excluir é renderizado', () => {
    renderWithRedux(<Table />, { initialState });
    const editRemoveButton = screen.getByTestId('delete-btn');
    expect(editRemoveButton).toBeInTheDocument();
  });

  it('testa se o botão Editar/Excluir remove a despesa corretamente', () => {
    const { store } = renderWithRedux(<Table />, { initialState });
    const editRemoveButton = screen.getByTestId('delete-btn');
    userEvent.click(editRemoveButton);
    const { expenses } = store.getState().wallet;
    expect(expenses).toHaveLength(0);
  });
});
