import React from "react";
import Button from "@material-ui/core/Button";

export default function UiButton(props) {
  return (
    <Button
      size={props.size}
      style={{ margin: 5 }}
      onClick={props.function}
      variant={props.variant ? props.variant : "contained"}
      color={props.name === "login" ? "primary" : props.name === "signup" ? "secondary" : props.color}
      type="submit"
      to={{ pathname: `/` }}>
      {props.name}
    </Button>
  );
}
