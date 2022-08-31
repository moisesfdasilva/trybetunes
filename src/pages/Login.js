import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    isLoginButtonDisabled: true,
    user: '',
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

  createUser = () => {
    // 2. Enquanto a informação da pessoa usuária é salva, uma mensagem com o texto Carregando... deve aparecer na tela
    // 3. faça um redirect para a rota /search
    <Link to="/search">Search</Link>;
  };

  render() {
    const { isLoginButtonDisabled, user } = this.state;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.loginNameInput }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isLoginButtonDisabled }
          onClick={ this.createUser({ name: user }) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
