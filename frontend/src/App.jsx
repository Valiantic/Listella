import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './services/api'
import './App.css'

function App() {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState('');


  // LOADING
  const { data: todos, isLoading, error } = useQuery('todos', fetchTodos);

  // FOR CREATION
  const createMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setNewTitle('');
    }
  });

  // FOR UPDATING
  const updateMutation = useMutation(({ id, updatedTodo }) => updateTodo(id, updatedTodo), {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  });

  // FOR DELETION
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  });

  // HANLDE CREATION OF TODO 
  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (newTitle.trim() !== '') {
      createMutation.mutate({ title: newTitle });
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <div style={{ padding: '2rem'}}>
      <h1>Listella</h1>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          placeholder="Enter todo title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Todo List */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: '1rem 0' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                updateMutation.mutate({ id: todo.id, updatedTodo: { completed: !todo.completed } })
              }
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', margin: '0 1rem' }}>
              {todo.title}
            </span>
            <button onClick={() => deleteMutation.mutate(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
