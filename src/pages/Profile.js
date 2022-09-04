import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: true,
    userData: [],
  };

  async componentDidMount() {
    await this.getUserData();
    this.setState({ loading: false });
  }

  getUserData = async () => {
    const receivedUserData = await getUser();
    this.setState({ userData: receivedUserData });
  };

  render() {
    const { loading, userData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <h3>Carregando...</h3> : '' }
        <img data-testid="profile-image" src={ userData.image } alt={ userData.name } />
        <h2>{ userData.name }</h2>
        <h3>{ userData.email }</h3>
        <p>{ userData.description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
