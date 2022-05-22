import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../App.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
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
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 && expenses.map((valor) => (

            <tr key={ valor.id }>
              <td>{valor.description}</td>
              <td>{valor.tag}</td>
              <td>{valor.method}</td>
              <td>{parseFloat(valor.value).toFixed(2)}</td>
              <td>{valor.exchangeRates[valor.currency].name}</td>
              <td>{parseFloat(valor.exchangeRates[valor.currency].ask).toFixed(2)}</td>
              <td>
                {
                  (valor.value * valor.exchangeRates[valor.currency].ask).toFixed(2)
                }

              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>);
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Table);
