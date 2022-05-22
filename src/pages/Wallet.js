import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/wallet/Header';
import Table from '../components/wallet/table';
import { currencyWallet, expenseWallet } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    const food = 'Alimentação';
    super();
    this.state = {
      arrayOfCoins: [],
      arrayState: [],
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
      exchangeRates: [],
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
    this.setState({ arrayOfCoins: arrayKeys });
  }

  callApi = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJson = await request.json();
    return requestJson;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value, description, currency, method, tag, arrayState } = this.state;
    const arrayStateAtual = [value, description, currency, method, tag, arrayState];
    arrayState.push(arrayStateAtual);
    this.setState({ [name]: target.value, arrayState });
  }

  apiPorEndPoint= async (endpoint) => {
    const request = await fetch(`https://economia.awesomeapi.com.br/json/${endpoint}`);
    const requestJson = await request.json();
    return requestJson;
  }

  async handleClick() {
    const cotacaoMoeda = await this.callApi();
    this.setState({ exchangeRates: cotacaoMoeda }, () => {
      const { id, value, description, currency, method, tag, exchangeRates } = this.state;
      const { mapExpenseWallet } = this.props;
      const dados = {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      mapExpenseWallet(dados);
      this.setState({
        id: id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: this.food,
        exchangeRates: {},
      });
    });
  }

  render() {
    const { arrayOfCoins, currency, description, method, tag, value } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <Header />
        <section>
          <form>
            <label htmlFor="inputValue">
              Valor:
              <input
                id="inputValue"
                type="number"
                data-testid="value-input"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="Moeda">
              Moeda
              <select
                id="Moeda"
                onChange={ this.handleChange }
                name="currency"
                value={ currency }
              >
                {arrayOfCoins.length > 0 && arrayOfCoins.map((valor, index) => (
                  <option value={ valor } key={ index }>{valor}</option>
                ))}

              </select>
            </label>
            <label
              htmlFor="method-input"
            >
              Método de Pagamento:
              <select
                data-testid="method-input"
                id="method-input"
                name="method"
                value={ method }
                onChange={ this.handleChange }
              >
                {methods.map((metodo, index) => (
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
                name="tag"
                onChange={ this.handleChange }
                value={ tag }
              >
                {tags.map((tipo, index) => (
                  <option key={ index } value={ tipo }>
                    {tipo}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="description">
              Descrição:
              <input
                type="text"
                id="description"
                name="description"
                value={ description }
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
        <Table />
      </div>);
  }
}
const mapDispatchToProps = (dispatch) => ({
  mapCurrencyWallet: (valor) => dispatch(currencyWallet(valor)),
  mapExpenseWallet: (value) => dispatch(expenseWallet(value)),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
Wallet.propTypes = {
  mapCurrencyWallet: PropTypes.func.isRequired,
  mapExpenseWallet: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
