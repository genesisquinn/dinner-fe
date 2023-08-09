import PropTypes from 'prop-types';
import "./PopUp.css";

const PopUp = ({ onConfirm, onCancel }) => {

    return (
        <div className="overlay">
            <div className="confirmation-dialog">
                <p>Are you sure? This action can not be undone.</p>
                <div className="buttons">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Reset</button>
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

