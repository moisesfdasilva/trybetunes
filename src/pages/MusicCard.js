import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, musicRecord } = this.props;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ musicRecord } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string,
  musicRecord: PropTypes.string,
}.isRequired;

export default MusicCard;
