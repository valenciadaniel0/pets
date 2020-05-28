import React from "react";
import { Table } from "react-bootstrap";
import { Pet } from "./model/Pet";
interface Props {
  pets: Array<Pet>;
}
class PetsList extends React.Component<Props, any> {
  renderPets() {
    return this.props.pets.map((pet) => {
      return (
        <tr key={pet.id}>
          <td>{pet.id}</td>
          <td>{pet.name}</td>
          <td>{pet.birthDate}</td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.pets) return <div>Loading...</div>;
    return (
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date of birth</th>
          </tr>
        </thead>
        <tbody>{this.renderPets()}</tbody>
      </Table>
    );
  }
}

export default PetsList;
