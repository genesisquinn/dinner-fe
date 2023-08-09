
import { useState } from 'react';
import PopUp from './PopUp';


const ResetButton = () => {
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    const handleResetClick = () => {
        setIsConfirmationVisible(true);
    };

    const handleConfirm = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleCancel = () => {
        setIsConfirmationVisible(false);
    };

    return (
        <div className="reset-button-container">
            <button onClick={handleResetClick} className="reset-button">
                Reset Liked Recipes
            </button>
            {isConfirmationVisible && (
                <PopUp
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default ResetButton;