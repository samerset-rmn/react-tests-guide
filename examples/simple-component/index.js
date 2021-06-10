import React from 'react';
import PropTypes from 'prop-types';

/**
 * Простой компонент без состояния.
 */
function Link({ url, name }) {
  return <a href={url}>{name}</a>;
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Link;
