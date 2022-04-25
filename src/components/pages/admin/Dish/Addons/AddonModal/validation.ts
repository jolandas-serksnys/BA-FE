import { ValidationMessage } from "@src/utils/validationMessage";
import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().required(ValidationMessage.FIELD_REQUIRED),
  isOptional: yup.boolean(),
  isMultiple: yup.boolean(),
  options: yup.array().of(
    yup.object({
      title: yup.string().required(ValidationMessage.FIELD_REQUIRED),
      price: yup.number().required(ValidationMessage.FIELD_REQUIRED).min(0)
    })
  ),
})