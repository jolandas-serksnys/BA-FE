import { ValidationMessage } from "@src/utils/validationMessage";
import * as yup from "yup";

export const validationSchema = yup.object({
  displayName: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  number: yup.number().min(1000).max(9999).typeError(ValidationMessage.TYPE_NUMBER),
  isAvailable: yup.boolean(),
  seats: yup.number().min(1).typeError(ValidationMessage.TYPE_NUMBER),
})