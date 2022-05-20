// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const ESTADO_INICIAL = {

  currencies: [],
  expenses: [],

};

const wallet = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case 'WALLET':
    return {
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};
export default wallet;
