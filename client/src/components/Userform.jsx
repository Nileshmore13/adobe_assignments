import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormErrorMessage,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/index";
import { useNavigate } from "react-router-dom";

const initialValuesRegister = {
  name: "",
  email: "",
  bio: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bio: Yup.string()
    .min(2, "Must be more that 2 letters")
    .max(200, "Must be less than 200 letters")
    .required("Bio is required"),
  password: Yup.string().required("Password is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("required"),
  password: Yup.string().required("required"),
});

const UserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const dispatch = useDispatch();

  const user = useSelector((state)=>state.app.user);
  const navigate = useNavigate();

  const register = async (values, onSubmit) => {
    setIsSubmitting(true);
    axios
      .post("http://localhost:8000/users", values)
      .then((res) => {
        console.log(res);
        alert("Register Success");
        setIsSubmitting(false);
        setPageType("login");
        onSubmit.resetForm();
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  const login = async (values, onSubmit) => {

    setIsSubmitting(true);
    axios
      .post("http://localhost:8000/login", values)
      .then((res) => {
        // console.log(res.data.user);
        setIsSubmitting(false);
        setPageType("login");
        dispatch(setLogin(res.data.user));
        onSubmit.resetForm();
        navigate("/home")
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  const handleSubmit = async (values, onSubmit) => {
    if (isLogin) await login(values, onSubmit);
    if (isRegister) await register(values, onSubmit);
  };

  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <Center>
            <Stack
              mt="0.3rem"
              spacing={4}
              align="center"
              border="1px solid black"
              borderRadius="1rem"
              width="60%"
              py="5rem"
            >
              {isRegister && (
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      w="full"
                      maxW="sm"
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input {...field} id="name" placeholder="Name" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )}

              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    w="full"
                    maxW="sm"
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="Email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {isRegister && (
                <Field name="bio">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.bio && form.touched.bio}
                      w="full"
                      maxW="sm"
                    >
                      <FormLabel htmlFor="nio">Bio</FormLabel>
                      <Input {...field} id="bio" placeholder="Bio" />
                      <FormErrorMessage>{form.errors.bio}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )}

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    w="full"
                    maxW="sm"
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={!formikProps.isValid || formikProps.isSubmitting}
                w="full"
                maxW="sm"
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Text
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Text>
            </Stack>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
