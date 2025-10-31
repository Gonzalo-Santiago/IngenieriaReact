import React from "react";
import './404.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>404 - Not Found</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/">Regresar al Inicio</Link>
        </div>
    );
};

export default NotFound;
