import React from 'react';
import PropTypes from 'prop-types';

/**
 * Простой компонент без состояния.
 */
function SimpleComponent({ url, name }) {
  return <a href={url}>{name}</a>;
}

SimpleComponent.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default SimpleComponent;
