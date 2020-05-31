import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  isSubmit: boolean;
  onClick: () => void;
  text: string;
}

class PrimaryButton extends React.Component<Props, any> {
  render() {
    return (
      <Button
        variant="primary"
        type={this.props.isSubmit ? "submit" : "button"}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default PrimaryButton;
