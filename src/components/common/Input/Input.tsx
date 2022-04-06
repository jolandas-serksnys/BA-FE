/*
import clsx from "clsx";
import { Field } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { TestableComponentProps } from "../TestableComponent";
import { InputWrapper, StyledNote } from "./Input.style"

interface Props extends TestableComponentProps, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string | React.ReactNode;
  note?: string | React.ReactNode;
}

export const Input = (props: Props) => {
  return (
    <InputWrapper className={props.className}>
      {props.label && <label className="form-label" htmlFor={props.name}>{props.label}</label>}
      <Field
        {...props}
        className={clsx('form-control', props.className)}
      />
      {props.note && <StyledNote htmlFor={props.name}>{props.note}</StyledNote>}
    </InputWrapper>
  )
}
*/

import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { InputWrapper } from './Input.style';
import { capitalize } from '@src/utils';
import clsx from 'clsx';

export const Input = (props: any) => {
  const { label, name, width, ...rest } = props;
  let widthClass;

  switch (width) {
    default:
    case 'full':
      widthClass = 'w-100'
      break;

    case 'half':
      widthClass = 'w-50'
      break;
  }

  return (
    <InputWrapper className={widthClass}>
      {label && <label className="form-label" htmlFor={name}>{label}</label>}
      <Field id={name} name={name} {...rest} className={clsx('form-control', props.className)} />
      <ErrorMessage name={name}>
        {message => (
          <small className="text-danger">
            {capitalize(message)}
          </small>
        )}
      </ErrorMessage>
    </InputWrapper>
  )
}