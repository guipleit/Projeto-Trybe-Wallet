/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      idCounter: 0,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  submitExpense = async (event) => {
    event.preventDefault();

    const { value, description, currency, method, tag, idCounter } = this.state;
    const { dispatch } = this.props;

    const expense = {
      value,
      currency,
      method,
      tag,
      description,
      id: idCounter,
    };

    dispatch(addExpense(expense));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      idCounter: idCounter + 1,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const currencyMap = currencies.map((currenc) => (
      <option key={ currenc } value={ currenc }>
        {currenc}
      </option>
    ));

    return (
      <form onSubmit={ this.submitExpense } className="box">
        <div className="columns is-gapless is-multiline">
          <div className="column is-2">
            <div className="field">
              <label htmlFor="value-input" className="label">
                Valor:
              </label>
              <div className="control">
                <input
                  id="value-input"
                  name="value"
                  type="number"
                  min="0"
                  step="1"
                  value={ value }
                  onChange={ this.handleInputChange }
                  data-testid="value-input"
                  className="input"
                />
              </div>
            </div>
          </div>
          <div className="column is-2">
            <div className="field">
              <label htmlFor="description-input" className="label">
                Descrição:
              </label>
              <div className="control">
                <input
                  id="description-input"
                  name="description"
                  type="text"
                  value={ description }
                  onChange={ this.handleInputChange }
                  data-testid="description-input"
                  className="input"
                />
              </div>
            </div>
          </div>
          <div className="column is-1">
            <div className="field">
              <label htmlFor="currency-input" className="label">
                Moeda:
              </label>
              <div className="control">
                <div className="select">
                  <select
                    id="currency-input"
                    name="currency"
                    value={ currency }
                    onChange={ this.handleInputChange }
                    data-testid="currency-input"
                  >
                    {currencyMap}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-2">
            <div className="field">
              <label htmlFor="method-input" className="label">
                Método de pagamento:
              </label>
              <div className="control">
                <div className="select">
                  <select
                    id="method-input"
                    name="method"
                    value={ method }
                    onChange={ this.handleInputChange }
                    data-testid="method-input"
                  >
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão de crédito">Cartão de crédito</option>
                    <option value="Cartão de débito">Cartão de débito</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-2">
            <div className="field">
              <label htmlFor="tag-input" className="label">
                Categoria:
              </label>
              <div className="control">
                <div className="select">
                  <select
                    id="tag-input"
                    name="tag"
                    value={ tag }
                    onChange={ this.handleInputChange }
                    data-testid="tag-input"
                  >
                    <option value="Alimentação">Alimentação</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Saúde">Saúde</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div
            className="column is-3"
            style={ { display:
            'flex',
            alignItems: 'flex-end' } }
          >
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-primary ">
                  Adicionar despesa
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies || [] });

export default connect(mapStateToProps)(WalletForm);
