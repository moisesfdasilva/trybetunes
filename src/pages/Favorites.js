import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: true,
    favorites: [],
  };

  async componentDidMount() {
    await this.getFavoriteMusics();
    this.setState({ loading: false });
  }

  getFavoriteMusics = async () => {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favorites: favoriteMusics });
  };

  favoriteMusic = async (action) => {
    const favoriteMusicData = action.target.name;
    this.setState({ loading: true });
    await removeSong(JSON.parse(favoriteMusicData));
    await this.getFavoriteMusics();
    this.setState({ loading: false });
  };

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <h3>Carregando...</h3> : '' }
        { (!loading) && (favorites.map((music, index) => (
          <MusicCard
            key={ index }
            musicObject={ music }
            favorites={ favorites }
            favoriteMusic={ this.favoriteMusic }
          />
        ))) }
      </div>
    );
  }
}

export default Favorites;
