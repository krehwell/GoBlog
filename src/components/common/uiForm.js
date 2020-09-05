import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function UiForm(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField onChange={props.handleChange}
          required id="standard-required"
          name={props.name} label={props.name}
          type={props.type}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') { ev.preventDefault(); }
          }}
        />
      </div>
    </form>
  );
}
