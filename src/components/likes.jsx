
import PropTypes from 'prop-types';

const LikesCounter = ({ likesCount }) => {
    return <div className="likes-counter">Likes: {likesCount}</div>;
};

LikesCounter.propTypes = {
    likesCount: PropTypes.number.isRequired,
};

export default LikesCounter;