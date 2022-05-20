import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <section data-testid="email-field">
        <h2>
          {email}
        </h2>
        <h2 data-testid="total-field">
          0
          {expenses}
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
