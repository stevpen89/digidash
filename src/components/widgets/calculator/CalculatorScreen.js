import React from 'react';
import PropTypes from 'prop-types';
import './CalculatorScreen.css';

export default function CalculatorScreen(props) {
  return (
    <div className="CalculatorScreen theme-text">
      {props.value}
    </div>
  );
}

CalculatorScreen.defaultProps = {
  value: '',
};

CalculatorScreen.propTypes = {
  value: PropTypes.string,
};