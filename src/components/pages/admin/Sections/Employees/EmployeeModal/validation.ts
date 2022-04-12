import { ValidationMessage } from "@src/utils/validationMessage";
import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  lastName: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  email: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  role: yup.string(),
})