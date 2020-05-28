import React from "react";
import { EstadoGeneral } from "../../redux/modelo/EstadoGeneral";
import { Pet } from "./model/Pet";
import PetsList from "./PetsList";
import { connect } from "react-redux";
import { listPetsAsync } from "../../redux/acciones/pets/pets.actions";
import { Container } from "react-bootstrap";

interface Props {
  pets: Array<Pet>;
  listPets: (pageNumber: number) => void;
}

class PetsContainer extends React.Component<Props, any> {
  componentDidMount() {
    this.props.listPets(1);
  }
  render() {
    return (
      <Container>
        <h1>Pets</h1>
        <PetsList pets={this.props.pets} />
      </Container>
    );
  }
}

const mapStateToProps = (state: EstadoGeneral) => {
  return state.pets;
};

export default connect(mapStateToProps, { listPets: listPetsAsync })(
  PetsContainer
);
