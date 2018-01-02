import React, { Component } from 'react';

class Check extends Component {
  state = {
    sequence: ''
  };

  closeHandler = event => {
    const { onClose } = this.props;
    this.setState(state => {
      return { ...state, sequence: '' };
    });
    onClose();
  };

  changeHandler = event => {
    const sequence = event.target.value;
    this.setState(state => {
      return { ...state, sequence };
    });
  };

  isValid = () => {
    const { sequence } = this.state;
    const { past } = this.props;
    const numbers = sequence.split(' ').map(value => +value.trim());

    return numbers.every(number => {
      return past.indexOf(number) >= 0;
    });
  };

  render() {
    const isValid = this.isValid();
    return (
      <div>
        <input
          type="text"
          value={this.state.sequence}
          onChange={this.changeHandler}
          className={isValid ? '' : 'has-error'}
        />

        <button type="button" onClick={this.closeHandler}>
          Close
        </button>
      </div>
    );
  }
}

export default Check;
