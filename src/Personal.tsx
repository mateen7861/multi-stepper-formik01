import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

interface Props {
  handleNext: () => void;
}

const PersonalDetail: React.FC<Props> = ({ handleNext }) => {
  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", age: 0 }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        age: Yup.number()
          .min(18, "Age must be greater than or equal to 18")
          .max(60, "Age must be less than 60"),
      })}
      onSubmit={(values) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));

          handleNext();
        }, 400);
      }}
    >
      {({ errors, touched, dirty, isValid }) => (
        <Form>
          <Field
            as={TextField}
            variant="filled"
            label="First Name"
            name="firstName"
            type="text"
            error={errors.firstName && touched.firstName}
            helperText={touched.firstName && errors.firstName}
          />
          <br />
          <br />
          <Field
            as={TextField}
            variant="filled"
            label="Last Name"
            name="lastName"
            type="text"
            error={errors.lastName && touched.lastName}
            helperText={touched.lastName && errors.lastName}
          />
          <br />
          <br />
          <Field
            as={TextField}
            variant="filled"
            label="Age"
            name="age"
            type="number"
            error={errors.age && touched.age}
            helperText={touched.age && errors.age}
          />
          <br />
          <br />
          <div>
            <FormControl component="fieldset" style={{ textAlign: "left" }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="primary" />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!dirty || !isValid}
          >
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalDetail;
