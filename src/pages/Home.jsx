import "./Home.css"
import googleButton from '../assets/GoogleBtn.png';

const navigate = (url) => {
    window.location.href = url;
};

const auth = async () => {
    const response = await fetch('https://dinner-made-easy.onrender.com/request', { method: 'post' });
    const data = await response.json();
    console.log(data);
    navigate(data.url);
};

const Home = () => {
    return (
        <button className="btn-auth" type="button" onClick={() => auth()}>
            <img className="btn-auth-img" src={googleButton} alt='google sign in' />
        </button>
    )
}

export default Home 