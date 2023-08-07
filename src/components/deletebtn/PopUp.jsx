import PropTypes from 'prop-types';
import "./PopUp.css";

const PopUp = ({ onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="confirmation-dialog">
                <p>Are you sure you want to delete all items?</p>
                <div className="buttons">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

PopUp.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default PopUp;


