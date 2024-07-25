import React, { useState } from "react";

const Todo = () => {
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setTask([...task, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    }

    const handleTaskCompletion = (id) => {
        const updatedTasks = task.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        setTask(updatedTasks);
    }

    const handleEditTask = (id, text) => {
        setEditingTaskId(id);
        setEditingTaskText(text);
    }

    const handleSaveTask = (id) => {
        const updatedTasks = task.map(t => t.id === id ? { ...t, text: editingTaskText } : t);
        setTask(updatedTasks);
        setEditingTaskId(null);
        setEditingTaskText('');
    }

    const handleDeleteTask = (id) => {
        const updatedTasks = task.filter(t => t.id !== id);
        setTask(updatedTasks);
    }

    return (
        <div>
            <h1>Todo App</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="New task here....." onChange={handleInputChange} value={newTask} />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {task.map(t => (
                    <li key={t.id} style={{ textDecoration: t.completed ? 'line-through' : 'none', padding: 4 }}>
                        {editingTaskId === t.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTaskText}
                                    onChange={(e) => setEditingTaskText(e.target.value)}
                                />
                                <button onClick={() => handleSaveTask(t.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span onClick={() => handleTaskCompletion(t.id)}>{t.text}</span>
                                <button onClick={() => handleEditTask(t.id, t.text)}>Edit Task</button>
                            </>
                        )}
                        <button onClick={() => handleDeleteTask(t.id)}>Delete Task</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
