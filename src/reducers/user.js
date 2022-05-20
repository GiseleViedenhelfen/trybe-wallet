// Esse reducer será responsável por tratar as informações da pessoa usuária
const ESTADO_INICIAL = {

  email: '',
};

const user = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case 'USER':
    return {
      ...state,
      email: action.emailString,
    };
  default:
    return state;
  }
};
export default user;
