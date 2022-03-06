import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PendingItems({ todo, handleSubmit }) {
  PendingItems.propTypes = {
    todo: PropTypes.shape.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  const [editing, setEditing] = useState(false);
  const [pendingTodo, setPendingTodo] = useState(todo);

  const handleClick = () => {
    setEditing(true);
  };

  const handleTitleChange = (event) => {
    setPendingTodo({
      ...pendingTodo,
      title: event.target.value,
    });
  };

  const handleCompletedChange = (event) => {
    handleSubmit({
      ...pendingTodo,
      completed: event.target.checked,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
      handleSubmit(pendingTodo);
    }
  };

  return editing ? (
    <div className="form-check editing">
      <input className="form-check-input" disabled type="checkbox" defaultChecked={pendingTodo.completed} />
      <input type="text" className="form-control-plaintext" id="staticEmail2" value={pendingTodo.title} onChange={handleTitleChange} onKeyDown={handleKeyDown} />
    </div>
  ) : (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" defaultChecked={pendingTodo.completed} id={`checkbox${pendingTodo.id}`} onChange={handleCompletedChange} />
      <checkbox className="form-check-label" htmlFor={`checkbox${pendingTodo.id}`} onClick={handleClick} onKeyDown={handleKeyDown}>
        {pendingTodo.title}
      </checkbox>
    </div>
  );
}

export default PendingItems;
