import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


class UpdateModel extends Component {
    render() {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Fav</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={() => this.props.handleUpdateSubmit(this.props.flowerId)}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Flower Name</Form.Label>
                                <Form.Control value={this.props.name} onChange={this.props.handleName} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Flower Photo</Form.Label>
                                <Form.Control value={this.props.photo} onChange={this.props.handlePhoto} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Flower instructions</Form.Label>
                                <Form.Control value={this.props.instructions} onChange={this.props.handleInstructions} />
                            </Form.Group>
                            <Button variant="secondary" onClick={this.props.handleClose}>
                                Close
                            </Button>
                            <Button type='submit' variant="primary" onClick={this.props.handleClose}>
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default UpdateModel
