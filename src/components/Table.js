import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleRemove = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  render() {
    const { expenses } = this.props;

    const expenseRows = expenses.map((expense) => {
      const exchangeRate = expense.exchangeRates[expense.currency];
      const convertedValue = Number(expense.value) * Number(exchangeRate.ask);
      const convertedRatio = Number(exchangeRate.ask);

      return (
        <tr key={ expense.id }>
          <td id={ `description-${expense.id}` }>{expense.description}</td>
          <td id={ `tag-${expense.id}` }>{expense.tag}</td>
          <td id={ `method-${expense.id}` }>{expense.method}</td>
          <td id={ `value-${expense.id}` }>{Number(expense.value).toFixed(2)}</td>
          <td id={ `currency-${expense.id}` }>{expense.currency}</td>
          <td id={ `converted-${expense.id}` }>{convertedRatio.toFixed(2)}</td>
          <td id={ `converted-value-${expense.id}` }>{convertedValue.toFixed(2)}</td>
          <td id={ `converted-currency-${expense.id}` }>{exchangeRate.name}</td>
          <td id={ `edit-remove-${expense.id}` }>
            <div>
              <button className="button is-link is-small">
                Editar
              </button>
              <button
                data-testid="delete-btn"
                className="button is-danger is-small"
                onClick={ () => this.handleRemove(expense.id) }
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="table-container">
        <table
          className="table is-bordered
         is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>&nbsp;Editar &nbsp; Excluir</th>
            </tr>
          </thead>
          <tbody>{expenseRows}</tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          code: PropTypes.string.isRequired,
          codein: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          high: PropTypes.string.isRequired,
          low: PropTypes.string.isRequired,
          varBid: PropTypes.string.isRequired,
          pctChange: PropTypes.string.isRequired,
          bid: PropTypes.string.isRequired,
          ask: PropTypes.string.isRequired,
          timestamp: PropTypes.string.isRequired,
          create_date: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses || [] });

export default connect(mapStateToProps)(Table);
