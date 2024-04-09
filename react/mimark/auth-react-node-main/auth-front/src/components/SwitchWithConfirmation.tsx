import React, { useState } from 'react';
import Modal from '../components/modal'; // Asegúrate de tener un componente Modal

interface SwitchWithConfirmationProps {
    isActive: boolean;
    toggleSwitch: () => void;
    confirmSwitch: () => void;
    cancelSwitch: () => void;
}
  
const SwitchWithConfirmation: React.FC<SwitchWithConfirmationProps> = ({ isActive, toggleSwitch, confirmSwitch, cancelSwitch }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true); // Mostrar modal de confirmación antes de cambiar el estado
    };

    const handleConfirmSwitch = () => {
        confirmSwitch();
        setShowModal(false);
    };

    const handleCancelSwitch = () => {
        cancelSwitch();
        setShowModal(false);
    };

    return (
        <>
            {/* Switch */}
            <label className="switch">
                <input type="checkbox" checked={isActive} onChange={openModal} />
                <span className="slider round"></span>
            </label>

            {/* Modal */}
            <Modal isOpen={showModal} onClose={handleCancelSwitch} onConfirm={handleConfirmSwitch}>
                <h2>Confirmar acción</h2>
                <p>¿Estás seguro de que quieres {isActive ? 'desactivar' : 'activar'} el switch?</p>
            </Modal>
        </>
    );
};

export default SwitchWithConfirmation;
