import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicObject, favorites, favoriteMusic } = this.props;
    return (
      <div>
        <p>{ musicObject.trackName }</p>
        <audio data-testid="audio-component" src={ musicObject.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
        <label htmlFor={ musicObject.trackId }>
          Favorita
          <input
            id={ musicObject.trackId }
            name={ JSON.stringify(musicObject) }
            type="checkbox"
            onChange={ favoriteMusic }
            data-testid={ `checkbox-music-${musicObject.trackId}` }
            checked={ favorites.some((music) => (
              music.trackId === musicObject.trackId)) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicObject: PropTypes.object,
  favorites: PropTypes.array,
  favoriteMusic: PropTypes.func,
}.isRequired;

export default MusicCard;
