import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RecipeCard = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>Recipe Name </Card.Title>
            <Card.Text>
                Recipe Description
            </Card.Text>
            <Button variant="primary">See Recipe</Button>
            </Card.Body>
        </Card>
        );
    }

export default RecipeCard