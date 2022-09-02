import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  favoriteMusic = async (action) => {
    const favoriteMusicId = action.target.name;

    this.setState({ loading: true });
    await addSong(favoriteMusicId);
    this.setState({ loading: false });
  };

  render() {
    const { musicName, musicRecord, musicId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ musicRecord } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            name={ musicId }
            type="checkbox"
            onChange={ this.favoriteMusic }
            data-testid={ `checkbox-music-${musicId}` }
          />
        </label>
        { loading ? <span>Carregando...</span> : '' }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string,
  musicRecord: PropTypes.string,
  musicId: PropTypes.string,
}.isRequired;

export default MusicCard;
