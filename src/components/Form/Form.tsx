import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";
import {
  Control,
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface LabelProps {
  htmlFor: string;
}
const Label = ({ htmlFor, children }: PropsWithChildren<LabelProps>) => {
  return (
    <Typography
      variant="h6"
      color="initial"
      component="label"
      htmlFor={htmlFor}
    >
      {children}
    </Typography>
  );
};

interface TextInputProps {
  name: string;
  id: string;
  label: string;
  control: Control<FieldValues, any>;
}
const TextInput = ({ name, id, label, control }: TextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField {...field} fullWidth required id={id} label={label} />
      )}
    />
  );
};

interface FormField {
  id: string;
  name: string;
  label: string;
}
interface FormProps {
  fieldsDefaultValues: FieldValues;
  formFields: FormField[];
  submitBtnTitle: string;
  submitHandler: (data: any) => void;
}

const Form = ({
  fieldsDefaultValues,
  formFields,
  submitBtnTitle,
  submitHandler,
}: FormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...fieldsDefaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Grid container alignItems="center" rowGap={4}>
        {formFields.map((field) => (
          <React.Fragment key={field.id}>
            <Grid xs={2}>
              <Label htmlFor={field.id}>{field.label}</Label>
            </Grid>
            <Grid xs={10}>
              <TextInput
                id={field.id}
                name={field.name}
                label={field.label}
                control={control}
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Stack marginTop={4} alignItems="center">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          sx={{ px: 8 }}
        >
          {submitBtnTitle}
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
