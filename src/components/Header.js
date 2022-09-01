import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    user: '',
  };

  async componentDidMount() {
    const userObject = await getUser();
    const userName = userObject.name;
    this.setState({
      loading: false,
      user: userName,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        <h3 data-testid="header-user-name">{ user }</h3>
        { loading ? <h3>Carregando...</h3> : '' }
      </header>
    );
  }
}

export default Header;
