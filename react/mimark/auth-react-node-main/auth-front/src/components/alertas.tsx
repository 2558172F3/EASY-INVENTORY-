import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AlertType = 'success' | 'error';

interface AlertProps {
    message: string;
    type: AlertType;
}

const Alertas: React.FC<AlertProps> = ({ message, type }) => {
    const showToast = () => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        }
    };

    return (
        <>
            <ToastContainer />
            <button onClick={showToast}>Mostrar Alerta</button>
        </>
    );
};

export default Alertas;