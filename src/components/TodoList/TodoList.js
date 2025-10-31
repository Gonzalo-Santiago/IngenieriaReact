import React, { useState, useContext, useEffect } from "react";
import './TodoList.css';
import { Trash2, Check } from 'lucide-react';
import ThemeContext from '../../context/ThemeContext';
import { db } from '../../firebaseConfig';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    where,
    serverTimestamp
} from "firebase/firestore";

const TodoList = () => {
    const { theme } = useContext(ThemeContext);
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // 🧭 Cargar tareas en tiempo real
    useEffect(() => {
        const collectionRef = collection(db, "tasks");
        const q = query(collectionRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksData = [];
            querySnapshot.forEach((doc) => {
                tasksData.push({ ...doc.data(), id: doc.id });
            });
            setTasks(tasksData);
        });

        return unsubscribe;
    }, []);

    // ➕ Agregar nueva tarea
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        await addDoc(collection(db, "tasks"), {
            text: inputValue,
            completed: false,
            createdAt: serverTimestamp()
        });

        setInputValue('');
    };

    // ✅ Marcar o desmarcar tarea completada
    const handleToggleComplete = async (task) => {
        const taskRef = doc(db, "tasks", task.id);
        const newCompletedStatus = !task.completed;

        // Cambiar el estado en la colección "tasks"
        await updateDoc(taskRef, {
            completed: newCompletedStatus
        });

        if (newCompletedStatus) {
            // Si se completó, agregar al historial
            await addDoc(collection(db, "historialDeTareasACompletadas"), {
                text: task.text,
                completedAt: serverTimestamp()
            });
        } else {
            // ⚠️ Si se desmarca, eliminar del historial
            const historialRef = collection(db, "historialDeTareasACompletadas");
            const q = query(historialRef, where("text", "==", task.text));
            const snapshot = await getDocs(q);

            snapshot.forEach(async (docu) => {
                await deleteDoc(doc(db, "historialDeTareasACompletadas", docu.id));
            });
        }
    };

    // 🗑️ Eliminar tarea y guardarla en historial
    const handleDeleteTask = async (task) => {
        try {
            await addDoc(collection(db, "historial"), {
                text: task.text,
                completed: task.completed,
                deletedAt: serverTimestamp()
            });

            const taskRef = doc(db, "tasks", task.id);
            await deleteDoc(taskRef);

            console.log("Tarea movida al historial correctamente");
        } catch (error) {
            console.error("Error al eliminar tarea y mover al historial:", error);
        }
    };

    return (
        <div className={`todo-list-container ${theme}`}>
            <h2>Mi Lista de Tareas</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <span className="task-text">{task.text}</span>
                        <div className="task-buttons">
                            <button
                                onClick={() => handleToggleComplete(task)}
                                className="complete-btn"
                                title={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
                            >
                                <Check />
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task)}
                                className="delete-btn"
                                title="Eliminar tarea"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAddTask} className="task-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Añade una nueva tarea..."
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default TodoList;
