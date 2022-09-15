import * as yup from "yup";

export const taskCreateSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        title: yup.string().required("title is required"),
        description: yup.string().required("description is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};
