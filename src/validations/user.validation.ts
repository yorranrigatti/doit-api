import * as yup from "yup";

export const userCreateSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("name is required"),
        email: yup.string().required("email is required"),
        password: yup.string().required("password is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export const userLoginSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        email: yup.string().required("email is required"),
        password: yup.string().required("password is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

