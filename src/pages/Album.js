import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    loading: true,
    musics: [],
    artist: '',
    album: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const album = await getMusics(id);
    const albumData = album[0];
    const albumArtist = albumData.artistName;
    const albumName = albumData.collectionName;
    this.setState({
      loading: false,
      musics: album.slice(1, album.lenght),
      artist: albumArtist,
      album: albumName,
    });
  }

  render() {
    const { loading, musics, artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artist }</h2>
        <h3 data-testid="album-name">{ album }</h3>
        { loading ? <h3>Carregando...</h3> : '' }
        { (!loading) && (musics.map((music, index) => (
          <MusicCard
            key={ index }
            musicName={ music.trackName }
            musicRecord={ music.previewUrl }
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
