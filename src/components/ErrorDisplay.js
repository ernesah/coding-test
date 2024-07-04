import React from 'react';
import PropTypes from 'prop-types';

const ErrorDisplay = ({ errorMessage }) => {
  return <div className='text-red-500 p-4'>{errorMessage}</div>;
};

ErrorDisplay.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default ErrorDisplay;
