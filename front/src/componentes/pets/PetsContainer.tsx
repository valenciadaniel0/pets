import React from "react";
import { EstadoGeneral } from "../../redux/modelo/EstadoGeneral";
import { Pet } from "./model/Pet";
import PetsList from "./PetsList";
import { connect } from "react-redux";
import {
  listPetsAsync,
  savePetAsync,
  findPetAsync,
  deletePetAsync,
} from "../../redux/acciones/pets/pets.actions";
import { Container, Button, Collapse } from "react-bootstrap";
import PetsCreate from "./PetsCreate";
import VaccinesModal from "../vaccines/VaccinesModal";

interface Props {
  pets: Array<Pet>;
  listPets: (pageNumber: number) => void;
  savePet: (formValues: any) => void;
  deletePet: (id: number) => void;
}

class PetsContainer extends React.Component<Props, any> {
  state = { open: false, showModal: false, petId: 0, petName: "" };

  componentDidMount() {
    this.props.listPets(1);
  }

  setOpen(newOpen: boolean) {
    this.setState({ open: newOpen });
  }

  onSubmitPets = (formValues: any) => {
    this.props.savePet(formValues);
    this.setState({ open: false });
  };

  handleOpenModal = (id: number, name: string) => {
    this.setState({ showModal: true, petId: id, petName: name });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  deletePet = (id: number) => {
    this.props.deletePet(id);
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
        <PetsList
          pets={this.props.pets}
          handleOpen={this.handleOpenModal}
          handleDeletePet={this.deletePet}
        />
        <VaccinesModal
          show={this.state.showModal}
          handleClose={this.handleCloseModal}
          petId={this.state.petId}
          petName={this.state.petName}
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
  findPet: findPetAsync,
  deletePet: deletePetAsync,
})(PetsContainer);
