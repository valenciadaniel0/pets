import React from "react";
import { EstadoGeneral } from "../../redux/modelo/EstadoGeneral";
import { Pet } from "./model/Pet";
import PetsList from "./PetsList";
import { connect } from "react-redux";
import {
  listPetsAsync,
  savePetAsync,
  findPetAsync
} from "../../redux/acciones/pets/pets.actions";
import { Container, Button, Collapse } from "react-bootstrap";
import PetsCreate from "./PetsCreate";
import VaccinesModal from "./VaccinesModal";

interface Props {
  pets: Array<Pet>;
  listPets: (pageNumber: number) => void;
  savePet: (formValues: any) => void;
}

class PetsContainer extends React.Component<Props, any> {
  state = { open: false, showModal: false, petId: 0 };

  componentDidMount() {
    this.props.listPets(1);
  }

  setOpen(newOpen: boolean) {
    this.setState({ open: newOpen });
  }

  onSubmitPets = (formValues: any) => {
    this.props.savePet(formValues);
  };

  handleOpenModal = (id: number) => {
    this.setState({ showModal: true, petId: id });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <Container>
        <h1>Pets</h1>
        <Button
          onClick={() => this.setOpen(!this.state.open)}
          aria-controls="pets-create-form"
          aria-expanded={this.state.open}
        >
          Add new pet
        </Button>
        <Collapse in={this.state.open}>
          <div id="pets-create-form">
            <PetsCreate onSubmit={this.onSubmitPets} />
          </div>
        </Collapse>
        <PetsList pets={this.props.pets} handleOpen={this.handleOpenModal} />
        <VaccinesModal
          show={this.state.showModal}
          handleClose={this.handleCloseModal}
          petId={this.state.petId}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: EstadoGeneral) => {
  return state.pets;
};

export default connect(mapStateToProps, {
  listPets: listPetsAsync,
  savePet: savePetAsync,
  findPet:findPetAsync
})(PetsContainer);
