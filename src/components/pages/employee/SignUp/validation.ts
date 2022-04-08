import { ValidationMessage } from "@src/utils/validationMessage";
import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().email().required(ValidationMessage.FIELD_REQUIRED),
  firstName: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  lastName: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  password: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], ValidationMessage.PASSWORD_CONFIRMATION).required(ValidationMessage.FIELD_REQUIRED),
  signUpCode: yup.string().required(ValidationMessage.FIELD_REQUIRED)
})