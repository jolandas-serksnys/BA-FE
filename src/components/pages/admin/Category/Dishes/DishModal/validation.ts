import { ValidationMessage } from "@src/utils/validationMessage";
import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  description: yup.string(),
  ageRestiction: yup.string(),
  isVisible: yup.boolean(),
  isAvailable: yup.boolean(),
  imageUrl: yup.string(),
  basePrice: yup.number().required(ValidationMessage.FIELD_REQUIRED).min(0),
})