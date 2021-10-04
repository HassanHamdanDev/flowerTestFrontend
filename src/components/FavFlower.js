import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import UpdateModel from './UpdateModel';

class FavFlower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowerData: [],
      flowerId: '',
      name: '',
      photo: '',
      instructions: '',
      isOpen: false,
    }
  }

  handleClose = () => { this.setState({ isOpen: false }) }
  handleShow = () => { this.setState({ isOpen: true }) }

  componentDidMount = async () => {
    let url = `${process.env.REACT_APP_HEROKU}/getUser/${this.props.auth0.user.email}`;
    let user = await axios.get(url);
    this.setState({
      flowerData: user.data.favFlowers
    });
    this.forceUpdate();
  }

  handleDeleteFav = async (id) => {
    let url = `${process.env.REACT_APP_HEROKU}/deleteFav/${this.props.auth0.user.email}/${id}`;
    let user = await axios.delete(url);
    this.setState({
      flowerData: user.data.favFlowers
    });
    this.forceUpdate();
  }

  handleUpdateFav = async (id, name, photo, instructions) => {
    this.setState({
      flowerId: id,
      name: name,
      photo: photo,
      instructions: instructions,
      isOpen: true,
    })
  }

  handleName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }
  handlePhoto = (event) => {
    this.setState({
      photo: event.target.value,
    })
  }
  handleInstructions = (event) => {
    this.setState({
      instructions: event.target.value,
    })
  }

  handleUpdateSubmit = async (id) => {
    let url = `${process.env.REACT_APP_HEROKU}/updateFav/${this.props.auth0.user.email}/${id}`;
    let updateData = {
      name: this.state.name,
      photo: this.state.photo,
      instructions: this.state.instructions,
    }
    let user = await axios.put(url, updateData);

    this.setState({
      flowerData: user.data.favFlowers,
    });
    this.forceUpdate();
  }

  render() {
    return (
      <Container>
        <UpdateModel
          isOpen={this.state.isOpen}
          handleShow={this.handleShow}
          handleClose={this.handleClose}
          flowerId={this.state.flowerId}
          name={this.state.name}
          photo={this.state.photo}
          instructions={this.state.instructions}
          handleName={this.handleName}
          handlePhoto={this.handlePhoto}
          handleInstructions={this.handleInstructions}
          handleUpdateSubmit={this.handleUpdateSubmit}
        />
        <h1>My Favorite Fruits</h1>
        <Row xs={1} md={4} className="g-4">
          {this.state.flowerData.map((elem, index) => {
            return (
              <Col key={index}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={elem.photo} />
                  <Card.Body>
                    <Card.Title>{elem.name}</Card.Title>
                    <Card.Text>{elem.instructions}</Card.Text>
                    <Button onClick={() => this.handleDeleteFav(elem._id)} variant="danger">Delete</Button>
                    <Button
                      onClick={() => this.handleUpdateFav(elem._id, elem.name, elem.photo, elem.instructions)}
                      variant="info">Update
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
          }
        </Row>
      </Container>
    )
  }
}

export default withAuth0(FavFlower);
