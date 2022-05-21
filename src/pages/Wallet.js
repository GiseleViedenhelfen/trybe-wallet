import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/wallet/Header';
import { currencyWallet } from '../actions/index';

class Wallet extends React.Component {
  async componentDidMount() {
    const { mapActionWallet } = this.props;
    const chamaApi = await this.callApi();
    const arrayKeys = Object.keys(chamaApi);
    const indexUSDT = arrayKeys.indexOf('USDT');
    arrayKeys.splice(indexUSDT, 1);
    mapActionWallet(arrayKeys);
  }

  callApi = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJson = await request.json();
    return requestJson;
  }

  render() {
    return (
      <div>
        <Header />
      </div>);
  }
}
const mapDispatchToProps = (dispatch) => ({
  mapActionWallet: (valor) => dispatch(currencyWallet(valor)),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
Wallet.propTypes = {
  mapActionWallet: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
