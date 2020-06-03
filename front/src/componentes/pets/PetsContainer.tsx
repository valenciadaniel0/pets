import React from "react";
import { EstadoGeneral } from "../../redux/modelo/EstadoGeneral";
import swal from "sweetalert";
import { Pet } from "./model/Pet";
import PetsList from "./PetsList";
import { connect } from "react-redux";
import {
  listPetsAsync,
  savePetAsync,
  findPetAsync,
  deletePetAsync,
  updatePetAsync,
} from "../../redux/acciones/pets/pets.actions";
import { Container, Button, Collapse } from "react-bootstrap";
import PetsCreate from "./PetsCreate";
import VaccinesModal from "../vaccines/VaccinesModal";

interface Props {
  pets: Array<Pet>;
  pet: Pet;
  listPets: (pageNumber: number) => void;
  savePet: (formValues: any) => void;
  deletePet: (id: number) => void;
  findPet: (id: number) => void;
  updatePet: (id: number, formValues: any) => void;
}

class PetsContainer extends React.Component<Props, any> {
  state = {
    open: false,
    showModal: false,
    petId: 0,
    petName: "",
    editingPet: false,
  };

  componentDidMount() {
    this.props.listPets(1);
  }

  setOpen(newOpen: boolean) {
    this.setState({ open: newOpen, editingPet: false });
  }

  onSubmitPets = (formValues: any) => {
    let message = "The pet has been successfully stored";
    if (!this.state.editingPet) {
      this.props.savePet(formValues);
    } else {
      formValues.birthDate = this.formatDate(new Date(formValues.birthDate));
      this.props.updatePet(this.props.pet.id, formValues);
      message = "The pet has been successfully updated";
    }
    swal(message, {
      icon: "success",
    });
    this.setState({ open: false });    
  };

  handleOpenModal = (id: number, name: string) => {
    this.setState({ showModal: true, petId: id, petName: name });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  deletePet = (id: number) => {
    swal({
      title: "Delete Pet",
      text: "Are you sure you want to delete this pet?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Confirm"],
    }).then((willDelete: boolean) => {
      if (willDelete) {
        this.props.deletePet(id);
        swal("The pet has been successfully removed", {
          icon: "success",
        });
        return false;
      } else {
        return false;
      }
    });
  };

  editPet = (id: number) => {
    this.props.findPet(id);
    this.setState({ open: true, editingPet: true });
  };

  renderPetForm() {
    if (!this.state.editingPet) {
      return <PetsCreate onSubmit={this.onSubmitPets} />;
    }
    return (
      <PetsCreate
        onSubmit={this.onSubmitPets}
        initialValues={{
          name: this.props.pet.name,
          birthDate: this.props.pet.birthDate,
        }}
      />
    );
  }

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
          <div id="pets-create-form">{this.renderPetForm()}</div>
        </Collapse>
        <PetsList
          pets={this.props.pets}
          handleOpen={this.handleOpenModal}
          handleDeletePet={this.deletePet}
          handleEditPet={this.editPet}
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

  formatDate(date: Date): string {
    let result: string = date.getFullYear() + "-";
    result +=
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1) + "-"
        : date.getMonth() + 1 + "-";
    result +=
      date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate() + "";
    return result;
  }
}

const mapStateToProps = (state: EstadoGeneral) => {
  const pet = state.pet.pet;
  const pets = state.pets.pets;
  return { pets, pet };
};

export default connect(mapStateToProps, {
  listPets: listPetsAsync,
  savePet: savePetAsync,
  findPet: findPetAsync,
  deletePet: deletePetAsync,
  updatePet: updatePetAsync,
})(PetsContainer);
