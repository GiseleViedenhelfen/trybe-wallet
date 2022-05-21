import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/wallet/Header';
import { currencyWallet, actionWallet } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayMoeda: [],
      despesas: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { mapCurrencyWallet } = this.props;
    const chamaApi = await this.callApi();
    const arrayKeys = Object.keys(chamaApi);
    const indexUSDT = arrayKeys.indexOf('USDT');
    arrayKeys.splice(indexUSDT, 1);
    mapCurrencyWallet(arrayKeys);
    this.setState({ arrayMoeda: arrayKeys });
  }

  callApi = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJson = await request.json();
    return requestJson;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  handleClick() {
    console.log('clique');
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
                name="value"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="Moeda">
              Moeda
              <select id="Moeda" onChange={ this.handleChange } name="moeda">
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
                name="tipoPagamento"
                onChange={ this.handleChange }
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
                name="tipoDespesa"
                onChange={ this.handleChange }
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
                name="descricao"
                data-testid="description-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa

            </button>
          </form>
        </section>
      </div>);
  }
}
const mapDispatchToProps = (dispatch) => ({
  mapCurrencyWallet: (valor) => dispatch(currencyWallet(valor)),
  mapActionWallet: (value) => dispatch(actionWallet(value)),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
Wallet.propTypes = {
  mapCurrencyWallet: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
