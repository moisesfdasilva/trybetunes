import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    name: '',
    email: '',
    description: '',
    image: '',
    disableSaveButton: true,
  };

  async componentDidMount() {
    await this.getUserData();
    this.setState({ loading: false });
  }

  verifySaveButton = () => {
    const { name, email, description, image } = this.state;
    const minLoginName = 3;
    const verifyLoginName = (name.length >= minLoginName);
    const arrayInput = [name, email, description, image];
    const minLInput = 0;
    const verifyInputnotEmpty = (arrayInput.every((input) => (input.length > minLInput)));
    if (verifyLoginName && verifyInputnotEmpty) {
      this.setState({ disableSaveButton: false });
    } else {
      this.setState({ disableSaveButton: true });
    }
  };

  getUserData = async () => {
    const receivedUserData = await getUser();
    this.setState({
      name: receivedUserData.name,
      email: receivedUserData.email,
      description: receivedUserData.description,
      image: receivedUserData.image,
    }, () => this.verifySaveButton());
  };

  profileChange = (action) => {
    const newDataName = action.target.name;
    const newDataText = action.target.value;
    this.setState({
      [newDataName]: newDataText,
    }, () => this.verifySaveButton());
  };

  saveUserData = () => {
    const { history } = this.props;

    this.setState({ loading: true });
    const { name, email, description, image } = this.state;
    updateUser({ name, email, description, image });
    this.setState({ loading: false });

    history.push('/profile');
  };

  render() {
    const { loading, name, email, description, image, disableSaveButton } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <h3>Carregando...</h3> : (
          <form>
            <input
              name="name"
              type="text"
              value={ name }
              data-testid="edit-input-name"
              onChange={ this.profileChange }
            />
            <input
              name="email"
              type="email"
              value={ email }
              data-testid="edit-input-email"
              onChange={ this.profileChange }
            />
            <input
              name="description"
              type="text"
              value={ description }
              data-testid="edit-input-description"
              onChange={ this.profileChange }
            />
            <input
              name="image"
              type="url"
              value={ image }
              data-testid="edit-input-image"
              onChange={ this.profileChange }
            />
            <button
              type="button"
              data-testid="edit-button-save"
              onClick={ this.saveUserData }
              disabled={ disableSaveButton }
            >
              Salvar
            </button>
          </form>
        ) }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default ProfileEdit;
