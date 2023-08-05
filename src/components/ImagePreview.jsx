import "./ImagePreview.css";

const ImagePreview = (props) => {
    const { image } = props;
    return (
        <div> 
            <img src={image && URL.createObjectURL(image)} />
        </div>
    )
}

export default ImagePreview;