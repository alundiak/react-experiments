// TODO move this to somewhere...
// https://www.robinwieruch.de/react-usereducer-hook/
// Reworked, Modified, Adapted.
import React from 'react';

const initialTodos = [
    {
        id: 'a',
        task: 'Learn React',
        complete: false,
    },
    {
        id: 'b',
        task: 'Learn Firebase',
        complete: false,
    },
];

export const AppSimple = () => {
    const handleChange = () => { };

    return (
        <ul>
            {initialTodos.map(todo => (
                <li key={todo.id}>
                    <label htmlFor={`test-${todo.id}`}>
                        <input
                            id={`test-${todo.id}`}
                            type="checkbox"
                            checked={todo.complete}
                            onChange={handleChange}
                        />
                        {todo.task}
                    </label>
                </li>
            ))}
        </ul>
    );
};

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'DO_TODO':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, complete: true };
                }
                return todo;
            });
        case 'UNDO_TODO':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, complete: false };
                }
                return todo;
            });
        default:
            return state;
    }
};

export const AppWithReducer = () => {
    const [todos, dispatch] = React.useReducer(
        todoReducer,
        initialTodos
    );

    const handleChange = todo => dispatch({
        type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
        id: todo.id
    });

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    <label htmlFor={`test-${todo.id}`}>
                        <input
                            id={`test-${todo.id}`}
                            type="checkbox"
                            checked={todo.complete}
                            onChange={() => handleChange(todo)}
                        />
                        {todo.task}
                    </label>
                </li>
            ))}
        </ul>
    );
};