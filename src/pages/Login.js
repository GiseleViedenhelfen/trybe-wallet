import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: false,
      emailString: '',
      password: false,
      disabledButton: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  constEmailValido = (valor) => /^\S+@\S+\.\S+$/.test(valor);

  handleInputChange(event) {
    const { value } = event.target;
    if (this.constEmailValido(value)) {
      this.setState({ email: true, emailString: value }, () => {
        this.buttonDisabled();
      });
    } else {
      this.setState({ email: false, emailString: value }, () => {
        this.buttonDisabled();
      });
    }
  }

  handlePassword(event) {
    const { value } = event.target;
    const minPasswordLength = 5;
    if (value.length > minPasswordLength) {
      this.setState({ password: true }, () => {
        this.buttonDisabled();
      });
    } else {
      this.setState({ password: false }, () => {
        this.buttonDisabled();
      });
    }
  }

  buttonDisabled() {
    const { email, password } = this.state;
    if (password && email) {
      this.setState({ disabledButton: false });
    } else { this.setState({ disabledButton: true }); }
  }

  handleClick() {
    const { history, mapActionUser } = this.props;
    history.push('/carteira');
    (mapActionUser((this.state)));
  }

  render() {
    const { disabledButton } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="emailInput">
            Email:
            <input
              type="email"
              id="emailInput"
              data-testid="email-input"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="senhaInput">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              id="senhaInput"
              onChange={ this.handlePassword }
            />
          </label>
          <button
            disabled={ disabledButton }
            type="button"
            onClick={ () => this.handleClick() }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  mapActionUser: (email) => dispatch(actionUser(email)),
});
Login.propTypes = {
  history: PropTypes.arrayOf([PropTypes.object]).isRequired,
  mapActionUser: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
