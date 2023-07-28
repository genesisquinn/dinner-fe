import { useState } from 'react';
import PropTypes from 'prop-types';
import PopUp from './PopUp';

const DeleteBtn = ({ onDelete }) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleDeleteClick = () => {
        setShowDialog(true);
    };

    const handleConfirm = () => {
        onDelete();
        setShowDialog(false);
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    return (
        <>
            <button onClick={handleDeleteClick}>Delete All</button>
            {showDialog && (
                <PopUp onConfirm={handleConfirm} onCancel={handleCancel} />
            )}
        </>
    );
};

DeleteBtn.propTypes = {
    onDelete: PropTypes.func.isRequired,}

export default DeleteBtn;
