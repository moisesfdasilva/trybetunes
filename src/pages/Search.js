import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    searchValue: '',
    searchAlbuns: '',
    loading: false,
    artist: '',
  };

  // componentWillUnmount() {
  //   this.setState({ usedButtonSearch: false });
  // }

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

  searchButton = async () => {
    const { searchValue } = this.state;
    this.setState({ loading: true });
    const searchData = await searchAlbumsAPI(searchValue);
    this.setState({
      isSearchButtonDisabled: false,
      artist: searchValue,
      searchValue: '',
      searchAlbuns: searchData,
      loading: false,
    }, () => {
      const { searchAlbuns } = this.state;
      console.log(searchAlbuns);
    });
  };

  render() {
    const { isSearchButtonDisabled, searchValue, searchAlbuns,
      loading, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            value={ searchValue }
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
        <article>
          <div>
            { loading ? <h3>Carregando...</h3> : '' }
            { (typeof searchAlbuns === 'object') ? (
              <h2>{ `Resultado de álbuns de: ${artist} `}</h2>) : '' }
          </div>
          <section>
            { (typeof searchAlbuns === 'object') && (searchAlbuns.length > 0) && (
              searchAlbuns.map((album, index) => (
                <div key={ index }>
                  <h4>{ album.collectionName }</h4>
                  <p>{ album.artistName }</p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  </Link>
                </div>
              ))) }
            { (typeof searchAlbuns === 'object') && (searchAlbuns.length === 0) && (
              <h2>Nenhum álbum foi encontrado</h2>) }
          </section>
        </article>
      </div>
    );
  }
}

export default Search;
