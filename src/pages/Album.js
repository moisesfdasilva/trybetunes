import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    loading: true,
    musics: [],
    artist: '',
    album: '',
    cover: '',
    favorites: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    await this.getAlbumMusics(id);
    await this.getFavoriteMusics();
    this.setState({ loading: false });
  }

  getAlbumMusics = async (id) => {
    const album = await getMusics(id);
    const albumData = album[0];
    const albumArtist = albumData.artistName;
    const albumName = albumData.collectionName;
    const albumImage = albumData.artworkUrl100;
    this.setState({
      musics: album.slice(1, album.lenght),
      artist: albumArtist,
      album: albumName,
      cover: albumImage,
    });
  };

  getFavoriteMusics = async () => {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favorites: favoriteMusics });
  };

  favoriteMusic = async (action) => {
    const favoriteMusicId = action.target.name;
    const favoriteMusicValue = action.target.checked;
    this.setState({ loading: true });
    if (favoriteMusicValue) {
      await addSong(JSON.parse(favoriteMusicId));
    } else {
      await removeSong(JSON.parse(favoriteMusicId));
    }
    await this.getFavoriteMusics();
    this.setState({ loading: false });
  };

  render() {
    const { loading, musics, artist, album, cover, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artist }</h2>
        <h3 data-testid="album-name">{ album }</h3>
        <img src={ cover } alt={ album } />
        { loading ? <h3>Carregando...</h3> : '' }
        { (!loading) && (musics.map((music, index) => (
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

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Album;
