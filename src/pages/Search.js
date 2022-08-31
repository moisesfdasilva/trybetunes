import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    searchValue: '',
  };

  componentDidMount() {
    // aaaaa
  }

  searchTextInput = (action) => {
    const searchText = action.target.value;
    const maxsearchText = 2;
    if (searchText.length >= maxsearchText) {
      this.setState({
        isSearchButtonDisabled: false,
        searchValue: searchText,
      });
    } else {
      this.setState({
        isSearchButtonDisabled: true,
        searchValue: searchText,
      });
    }
  };

  searchButton = () => {
    const { searchValue } = this.state;
    const searchArist = searchValue;
    this.setState({
      isSearchButtonDisabled: false,
      searchValue: '',
    });
    searchAlbumsAPI(searchArist);
  };

  render() {
    const { isSearchButtonDisabled } = this.state;
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
            onClick={ this.searchButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
