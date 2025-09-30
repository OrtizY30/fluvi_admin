
import { TextField } from "@mui/material";

type InputModifiersGroupProps = {
    name: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function InputModifiersGroup({ name, handleChange }: InputModifiersGroupProps) {

  return (
    <TextField
      id="standard-basic"
      name="name"
      label="Categoría"
      variant="standard"
      value={name}
      onChange={handleChange}
      size="small"
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "1rem",
          padding: "0px 0",
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",
        },
      }}
    />
  );
}
