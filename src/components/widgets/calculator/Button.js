import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.value);
  }

  render() {
    return (
      <button className={`Button ${this.props.className}`} onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}

Button.defaultProps = {
  className: '',
  value: '',
  onClick: null,
};

Button.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;