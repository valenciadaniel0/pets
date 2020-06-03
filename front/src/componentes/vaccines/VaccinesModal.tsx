import React from "react";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import swal from "sweetalert";
import VaccinesList from "./VaccinesList";
import { Vaccine } from "./model/Vaccine";
import { EstadoGeneral } from "../../redux/modelo/EstadoGeneral";
import {
  listVaccinesAsync,
  saveVaccineAsync,
  deleteVaccineAsync,
} from "../../redux/acciones/vaccines/vaccines.actions";
import { connect } from "react-redux";
import VaccinesCreate from "./VaccinesCreate";
interface Props {
  show: boolean;
  handleClose: () => void;
  saveVaccine: (formValues: any) => void;
  deleteVaccine: (id: number, petId: number) => void;
  listVaccines: (pageNumber: number, petId: number) => void;
  vaccines: Array<Vaccine>;
  petId: number;
  petName: string;
}
class VaccinesModal extends React.Component<Props, any> {
  state = { petId: 0, activeTab: "list" };
  componentDidUpdate() {
    if (this.props.petId !== this.state.petId) {
      this.setState({ petId: this.props.petId });
      this.props.listVaccines(1, this.props.petId);
    }
  }

  onSubmitVaccines = (formValues: any) => {
    const petId = this.props.petId;
    this.props.saveVaccine({ ...formValues, pet: { id: petId } });
    this.setState({ activeTab: "list" });
    swal("The Vaccine has been stored successfully", {
      icon: "success",
    });
  };

  deleteVaccine = (id: number, petId: number) => {
    swal({
      title: "Delete Vaccine",
      text: "Are you sure you want to delete this vaccine?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Confirm"],
    }).then((willDelete: boolean) => {
      if (willDelete) {
        this.props.deleteVaccine(id, petId);
        swal("The vaccine has been successfully removed", {
          icon: "success",
        });
        return false;
      } else {
        return false;
      }
    });
  };

  setActiveTab(key: string) {
    this.setState({ activeTab: key });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{`Vaccines of ${this.props.petName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            activeKey={this.state.activeTab}
            onSelect={(key: string) => this.setActiveTab(key)}
            id="controlled-tab-example"
          >
            <Tab eventKey="list" title="List">
              <VaccinesList
                petId={this.props.petId}
                vaccines={this.props.vaccines}
                petName={this.props.petName}
                handleDeleteVaccine={this.deleteVaccine}
              />
            </Tab>
            <Tab eventKey="create" title="Create new">
              <VaccinesCreate
                petId={this.props.petId}
                onSubmit={this.onSubmitVaccines}
              />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state: EstadoGeneral) => {
  return state.vaccines;
};

export default connect(mapStateToProps, {
  listVaccines: listVaccinesAsync,
  saveVaccine: saveVaccineAsync,
  deleteVaccine: deleteVaccineAsync,
})(VaccinesModal);
