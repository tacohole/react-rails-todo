import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Pending from './Pending';
import Completed from './Completed';
import Create from './Create';

function Home() {
  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = '/todos/all_todos';
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('network response was not ok');
      })
      .then((response) => {
        setTodos(response);
        setLoading(false);
      })
      .catch(() => console.log('an error occurred while fetching todos'));
  }, []);

  return (
    <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Todo</h1>
          <p className="lead">
            A curated list of blah blah blah
          </p>
          <hr className="my-4" />
          {
                    loading ? <Loader /> : (
                      <div>
                        <Create />
                        <Pending pending={todos.pending} />
                        <hr className="my-4" />
                        <Completed completed={todos.completed} />
                      </div>
                    )
                }
        </div>
      </div>
    </div>
  );
}

export default Home;
