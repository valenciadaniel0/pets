import React from "react";
import { Table, Button } from "react-bootstrap";
import { Vaccine } from "./model/Vaccine";

interface Props {
  petId: number;
  vaccines: Array<Vaccine>;
  petName: string;
  handleDeleteVaccine: (id: number, petId: number) => void;
}

class VaccinesList extends React.Component<Props, any> {
  componentDidMount() {}

  renderVaccines() {
    if (0 === this.props.vaccines.length) {
      return (
        <tr>
          <td colSpan={3}>
            <span>No vaccines for {this.props.petName}</span>
          </td>
        </tr>
      );
    }
    return this.props.vaccines.map((vaccine) => {
      return (
        <tr key={vaccine.id}>
          <td>{vaccine.id}</td>
          <td>{vaccine.name}</td>
          <td>{vaccine.date}</td>
          <td>
            <Button
              variant="danger"
              onClick={() =>
                this.props.handleDeleteVaccine(vaccine.id, vaccine.petId)
              }
            >
              🗑
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.vaccines) return <div>Loading...</div>;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{this.renderVaccines()}</tbody>
      </Table>
    );
  }
}

export default VaccinesList;
