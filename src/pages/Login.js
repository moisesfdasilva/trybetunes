import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isLoginButtonDisabled: true,
    user: '',
    loading: false,
  };

  loginNameInput = (action) => {
    const loginName = action.target.value;
    const maxLoginName = 3;
    if (loginName.length >= maxLoginName) {
      this.setState({
        isLoginButtonDisabled: false,
        user: loginName,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
        user: loginName,
      });
    }
  };

  loginButton = async () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: user });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { isLoginButtonDisabled, user, loading } = this.state;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          value={ user }
          data-testid="login-name-input"
          onChange={ this.loginNameInput }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isLoginButtonDisabled }
          onClick={ this.loginButton }
        >
          Entrar
        </button>
        { loading ? <h3>Carregando...</h3> : '' }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Login;
