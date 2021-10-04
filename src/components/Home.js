import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowerData: [],
      userData: [],
    }
  }

  componentDidMount = async () => {
    let url = `${process.env.REACT_APP_HEROKU}/getFlowers`;
    let flowersData = await axios.get(url);
    this.setState({
      flowerData: flowersData.data,
    });
    this.forceUpdate();

    let userURL = `${process.env.REACT_APP_HEROKU}/createUser/${this.props.auth0.user.email}`;
    await axios.post(userURL);
  }

  handleAddToFav = async (id) => {
    let url = `${process.env.REACT_APP_HEROKU}/addToFav/${this.props.auth0.user.email}/${id}`;
    let userData = await axios.put(url);
    this.setState({
      userData: userData.data,
    })
  }

  render() {
    return (
      <Container>
        <h1>API Fruits</h1>
        <Row xs={1} md={4} className="g-4">
          {this.state.flowerData.map((elem, index) => {
            return (
              <Col key={index}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={elem.photo} />
                  <Card.Body>
                    <Card.Title>{elem.name}</Card.Title>
                    <Card.Text>{elem.instructions}</Card.Text>
                    <Button onClick={() => this.handleAddToFav(elem._id)} variant="primary">Add To Fav</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    )
  }
}

export default withAuth0(Home);
