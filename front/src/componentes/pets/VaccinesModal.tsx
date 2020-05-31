import React from "react";
import { Modal, Button } from "react-bootstrap";
interface Props {
  show: boolean;
  handleClose: () => void;
  petId: number;
}
class VaccinesModal extends React.Component<Props, any> {
  state = { petId: 0 };
  componentDidUpdate() {
    if (this.state.petId !== this.props.petId) {      
      this.setState({ petId: this.props.petId });      
    }
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VaccinesModal;
