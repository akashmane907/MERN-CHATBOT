import React from "react";
import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string; // Corrected spelling
};

const CustomizedInput: React.FC<Props> = (props) => {
  return (
    <TextField
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: "420px",
          margin: 5,
          borderRadius: 10,
          borderColor: "white",
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;
