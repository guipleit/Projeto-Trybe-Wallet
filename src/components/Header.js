/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const total = expenses.reduce((acc, expense) => {
      const { currency, value, exchangeRates } = expense;
      let valueInBRL = value;

      if (exchangeRates[currency]) {
        const conversionRate = exchangeRates[currency].ask;
        valueInBRL = value * conversionRate;
      }

      return acc + valueInBRL;
    }, 0);

    return (
      <nav className="navbar is-white">
        <div className="navbar-brand">
          <p data-testid="header-currency-field" className="navbar-item">
            Total:
          </p>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <p data-testid="total-field" className="navbar-item">
              {new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
                .format(total)
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              {' '}
              BRL
            </p>
          </div>
          <div className="navbar-end">
            <p data-testid="email-field" className="navbar-item">
              {email}
            </p>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
