import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, musicRecord, musicId,
      favorites,
      favoriteMusic,
    } = this.props;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ musicRecord } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
        <label htmlFor={ musicId }>
          Favorita
          <input
            name={ musicId }
            type="checkbox"
            onChange={ favoriteMusic }
            data-testid={ `checkbox-music-${musicId}` }
            checked={ favorites.some((music) => (music === String(musicId))) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string,
  musicRecord: PropTypes.string,
  musicId: PropTypes.string,
  favorites: PropTypes.array,
  favoriteMusic: PropTypes.func,
}.isRequired;

export default MusicCard;
