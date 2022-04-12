import { ValidationMessage } from "@src/utils/validationMessage";
import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  description: yup.string(),
  type: yup.string(),
})