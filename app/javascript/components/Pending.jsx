import React from 'react';
import PropTypes from 'prop-types';

import PendingItems from './PendingItems';

function Pending({ pending }) {
  Pending.propTypes = {
    pending: PropTypes.shape.isRequired,
  };

  const handleSubmit = (body) => {
    const url = '/todos/update';
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'PUT',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch(() => console.log('an error occurred adding todo'));
  };

  return (
    <div>
      <h4>Pending</h4>
      {pending.map((todo) => (
        <PendingItems key={todo.id} todo={todo} handleSubmit={handleSubmit} />
      ))}
    </div>
  );
}

export default Pending;
