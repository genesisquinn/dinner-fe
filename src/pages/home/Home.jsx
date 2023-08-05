import "./home.css"
import googleButton from "../../assets/google_sign_in_buttons/google_btn_light.png"

const navigate = (url) => {
    window.location.href = url;
};

const auth = async () => {
    const response = await fetch('https://dinner-made-easy.onrender.com', { method: 'post' });
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