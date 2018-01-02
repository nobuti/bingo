import React from 'react';
import _ from 'lodash';
import { NUMBERS } from '../config';

const numbers = Array.apply(null, { length: NUMBERS }).map(function(
  value,
  index
) {
  return index + 1;
});

const renderList = past => {
  return numbers.map(value => {
    const cssClass = past.indexOf(value) >= 0 ? 'Number is-past' : 'Number';

    return (
      <li key={value} className={cssClass}>
        {value}
      </li>
    );
  });
};

const Grid = ({ past }) => {
  return (
    <div className="Checking">
      <ul className="Numbers">{renderList(past)}</ul>
      <div className="Current">{_.last(past)}</div>
    </div>
  );
};

export default Grid;
