import React, { useEffect, useState, useContext } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ThemeContext from "../../context/ThemeContext";
import "./History.css";
import { Link } from 'react-router-dom';

const Historial = () => {
    const { theme } = useContext(ThemeContext);
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    // ==== Historial de tareas eliminadas ====
    useEffect(() => {
        const collectionRef = collection(db, "historial");
        const q = query(collectionRef, orderBy("deletedAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setDeletedTasks(data);
        });

        return unsubscribe;
    }, []);

    // ==== Historial de tareas completadas ====
    useEffect(() => {
        const collectionRef = collection(db, "historialDeTareasACompletadas");
        const q = query(collectionRef, orderBy("completedAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setCompletedTasks(data);
        });

        return unsubscribe;
    }, []);

    return (
        <div className={`historial-container ${theme}`}>
            <Link to="/">Regresar al Inicio</Link>

            <h2>Historial de Tareas Eliminadas</h2>

            <ul>
                {deletedTasks.length === 0 ? (
                    <p>No hay tareas eliminadas aún</p>
                ) : (
                    deletedTasks.map((task) => (
                        <li key={task.id}>
                            <span>{task.text}</span>
                            <span className="fecha">
                                {task.deletedAt?.toDate
                                    ? new Date(task.deletedAt.toDate()).toLocaleString()
                                    : "Sin fecha"}
                            </span>
                        </li>
                    ))
                )}
            </ul>

            <h2>Historial de Tareas Completadas</h2>
            <ul>
                {completedTasks.length === 0 ? (
                    <p>No hay tareas completadas aún</p>
                ) : (
                    completedTasks.map((task) => (
                        <li key={task.id}>
                            <span>{task.text}</span>
                            <span className="fecha">
                                {task.completedAt?.toDate
                                    ? new Date(task.completedAt.toDate()).toLocaleString()
                                    : "Sin fecha"}
                            </span>
                        </li>
                    ))
                )}
            </ul>

        </div>
    );
};

export default Historial;
