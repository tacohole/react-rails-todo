import React, { useState } from 'react';

function Create() {
  const [createTodo, setCreateTodo] = useState(false);
  const [todo, setTodo] = useState('');

  const showCreateTodo = () => {
    setCreateTodo(true);
  };

  const cancelCreateTodo = () => {
    setCreateTodo(false);
  };

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todo === '') return;

    const todoBody = {
      title: todo,
      completed: false,
    };

    const url = '/todos/create';
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todoBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('network response was not ok');
      })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch(() => console.log('an error occurred adding todo'));
  };

  return (
    <div>
      {
    !createTodo && <button type="button" className="btn btn-primary align-right" onClick={showCreateTodo}>Add Todo</button>
    }
      {
    createTodo && (
    <form className="create-todo" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-9">
          <input type="text" className="form-control-plaintext mr-3" placeholder="Todo Item" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary col mr-2">Add</button>
        <button type="button" className="btn btn-outline-primary col" onClick={cancelCreateTodo}>Cancel</button>
      </div>
    </form>
    )
    }
    </div>

  );
}

export default Create;
