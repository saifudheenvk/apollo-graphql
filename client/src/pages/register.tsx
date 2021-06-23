import React, { FC } from "react";
import { Form, Formik } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Button, FormErrorMessage } from "@chakra-ui/react";
import Wrapper from "../components/Login/Wrapper";
import InputField from "../components/Login/InputField";
import { useCreateUserMutation } from "../generated/graphql";

interface registerProps {}

const register: FC<registerProps> = ({}) => {
  const [, createUser] = useCreateUserMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          const data = await createUser({ userInput: values });
          console.log(data);
          return data;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField
                label="Email"
                name="email"
                placeholder="Email"
                type="email"
              />

              <Box mt={4} mb={4}>
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </Box>
              <Button isLoading={isSubmitting} bgColor="teal" type="submit">
                Register
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default register;
