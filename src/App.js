import React, { Component } from 'react';
import _ from 'lodash';
import { NUMBERS, KEYS, MODE } from './config';
import Grid from './components/Grid';
import Check from './components/Check';

const getBolos = () => {
  const bolos = Array.apply(null, { length: NUMBERS }).map(function(
    value,
    index
  ) {
    return index + 1;
  });

  return _.shuffle(bolos);
};

class App extends Component {
  state = {
    next: getBolos(),
    past: [],
    mode: MODE.playing
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.addRemoveListener('keydown', this.onKeyDown);
  }

  onKeyDown = event => {
    const code = event.which;
    console.log(code);

    if (code === KEYS.next) {
      this.nextMove();
    } else if (code === KEYS.check) {
      this.setState(state => {
        return { ...state, mode: MODE.checking };
      });
    } else if (code === KEYS.play) {
      this.setState(state => {
        return { ...state, mode: MODE.playing };
      });
    } else if (code === KEYS.restart) {
      this.setState(state => {
        return { ...state, mode: MODE.playing, past: [], next: getBolos() };
      });
    }
  };

  nextMove = () => {
    const next = this.state.next.slice();
    const past = this.state.past.slice();
    const move = next.shift();
    this.setState(state => {
      return {
        ...state,
        next,
        past: [...past, move]
      };
    });
  };

  render() {
    console.log(this.state);
    const { mode, past } = this.state;

    if (mode === MODE.playing) {
      return <Grid past={past} />;
    } else if (mode === MODE.checking) {
      return <Check past={past} />;
    }
  }
}

export default App;
