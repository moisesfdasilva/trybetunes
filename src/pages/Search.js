import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    // search: '',
  };

  searchTextInput = (action) => {
    const searchText = action.target.value;
    const maxsearchText = 2;
    if (searchText.length >= maxsearchText) {
      this.setState({
        isSearchButtonDisabled: false,
        // search: loginName,
      });
    } else {
      this.setState({
        isSearchButtonDisabled: true,
        // search: loginName,
      });
    }
  };

  render() {
    const { isSearchButtonDisabled,
      // search,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.searchTextInput }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            // onClick={ this.createUser({ name: user }) }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
