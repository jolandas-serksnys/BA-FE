import React, { DetailedHTMLProps, Fragment, InputHTMLAttributes, useState } from "react";
import { TestableComponentProps } from "../../TestableComponent";
import { InputWrapper, StyledNote } from "../Input.style";
import { HiddenInput, CodeInput as InputField } from "./CodeInput.style";
import clsx from 'clsx'

interface Props extends TestableComponentProps, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string | React.ReactNode;
  note?: string | React.ReactNode;
  value: string;
  length: number;
  setValue: (value: string) => void;
}

export const CodeInput = ({ value, setValue, length, ...props }: Props) => {
  const [values, setValues] = useState(new Array(length));
  const [focus, setFocus] = useState(false);
  const inputs = new Array(length).fill('');
  const namePrefix = props.name ? `${props.name}-` : '';
  const idPrefix = props.id ? `${props.id}-` : '';
  const symbols = props.type === 'numberic' ? /^[0-9]+$/ : /^[0-9a-zA-Z]+$/;

  const nextInput = (event: React.KeyboardEvent<HTMLInputElement>, senderIndex: number) => {
    const senderElement = event.target as HTMLInputElement;
    let nextElement;
    const oldValues = values;

    if (event.ctrlKey && event.key === 'V') {
      return;
    }

    if (event.key === 'Backspace') {
      senderElement.value = '';
      oldValues[senderIndex] = null;
      nextElement = document.querySelector(`[name=${namePrefix}input-${senderIndex - 1}]`) as HTMLInputElement;
    } else if (event.key === 'Tab') {
      return;
    } else if (event.key.match(symbols) && event.key.length === 1) {
      senderElement.value = event.key;
      oldValues[senderIndex] = event.key;

      if (senderElement.value) {
        nextElement = document.querySelector(`[name=${namePrefix}input-${senderIndex + 1}]`) as HTMLInputElement;
      }
    } else {
      senderElement.value = '';
    }

    setValues(oldValues);
    setValue(values.join(''));

    if (nextElement) {
      nextElement.focus();
    }
  };

  const handleOnPaste = (event: React.ClipboardEvent) => {
    if (!event.clipboardData || !event.clipboardData.getData('Text')) {
      return;
    }

    const data = event.clipboardData.getData('Text');

    if (data.match(symbols)) {
      setValue(data.slice(0, length));
    }

  };

  const handleOnFocus = () => setFocus(true);
  const handleOnBlue = () => setFocus(false);

  return (
    <InputWrapper className={props.className}>
      {props.label && <label className="form-label" htmlFor={`${namePrefix}input-0`}>{props.label}</label>}
      <InputField className={clsx('form-control', 'form-control-code', 'p-0', 'd-flex', 'align-items-center', focus && 'form-control-focus')} id={`${idPrefix}inputs-container`} length={length}>
        {(inputs.map((_field, index) =>
          <Fragment key={index}>
            <input
              {...props}
              id={props.id ? `${idPrefix}input-${index}` : undefined}
              name={`${namePrefix}input-${index}`}
              onKeyUp={(event) => nextInput(event, index)}
              maxLength={1}
              min={props.type === 'number' ? 0 : undefined}
              max={props.type === 'number' ? 9 : undefined}
              className={clsx('form-control')}
              onFocus={handleOnFocus}
              onBlur={handleOnBlue}
              size={1}
              onPaste={handleOnPaste}
            />
            {index + 1 < inputs.length && <span>-</span>}
          </Fragment>
        ))}
      </InputField>
      <HiddenInput
        {...props}
        value={value}
        minLength={length}
        maxLength={length}
        readOnly
      />
      {props.note && <StyledNote htmlFor={props.name}>{props.note}</StyledNote>}
    </InputWrapper>
  );
}