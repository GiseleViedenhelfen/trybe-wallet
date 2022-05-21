import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/wallet/Header';
import { currencyWallet } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayMoeda: [],
    };
  }

  async componentDidMount() {
    const { mapActionWallet } = this.props;
    const chamaApi = await this.callApi();
    const arrayKeys = Object.keys(chamaApi);
    const indexUSDT = arrayKeys.indexOf('USDT');
    arrayKeys.splice(indexUSDT, 1);
    mapActionWallet(arrayKeys);
    this.setState({ arrayMoeda: arrayKeys });
  }

  callApi = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJson = await request.json();
    return requestJson;
  }

  render() {
    const { arrayMoeda } = this.state;
    const formasDePagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tipoDeDespesa = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <Header />
        <section>
          <form>
            <label htmlFor="inputValor">
              Valor:
              <input
                id="inputValor"
                type="number"
                data-testid="value-input"
              />
            </label>
            <label htmlFor="Moeda">
              Moeda
              <select id="Moeda">
                {arrayMoeda.length > 0 && arrayMoeda.map((valor, index) => (
                  <option value={ valor } key={ index }>{valor}</option>
                ))}

              </select>
            </label>
            <label
              htmlFor="tipoPagamento"
            >
              Método de Pagamento:
              <select
                data-testid="method-input"
                id="tipoPagamento"
              >
                {formasDePagamento.map((metodo, index) => (
                  <option key={ index } value={ metodo }>
                    {metodo}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="tipoDespesa">
              Categoria:
              <select
                id="tipoDespesa"
                data-testid="tag-input"
              >
                {tipoDeDespesa.map((tipo, index) => (
                  <option key={ index } value={ tipo }>
                    {tipo}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="descricao">
              Descrição:
              <input
                type="text"
                id="descricao"
                data-testid="description-input"
              />
            </label>
          </form>
        </section>
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
