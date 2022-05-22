import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.calculate = this.calculate.bind(this);
  }

  calculate = () => {
    const { expenses } = this.props;
    let acc = 0;
    expenses.forEach((element) => {
      const currentCoin = element.currency;
      const currentValue = element.value;
      const allCurrencies = element.exchangeRates;
      const currCoinValue = (parseFloat(allCurrencies[currentCoin].ask));
      const multCoinValue = currCoinValue * currentValue;
      acc += multCoinValue;
    });
    return acc.toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <section data-testid="email-field">
        <h2>
          {email}
        </h2>
        <h2 data-testid="total-field">
          {expenses.length === 0 ? <h2>0</h2> : this.calculate()}
        </h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </section>);
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default connect(mapStateToProps)(Header);
