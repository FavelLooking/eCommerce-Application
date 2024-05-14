import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { LoginFormFields, RegExps } from '../../types';
import validateInput from '../../utils/validation';

type InputProps = {
  name: string;
  id: string;
  register: UseFormRegister<LoginFormFields>;
  registerLabel: Path<LoginFormFields>;
  pattern: RegExps[];
};

export default function TextInput(props: InputProps) {
  const { name, id, register, registerLabel, pattern } = props;

  return (
    <label htmlFor={id}>
      {name}
      <input
        id={id}
        type="text"
        placeholder={`type your ${name}...`}
        {...register(registerLabel, {
          required: `${name} is required`,
          validate: (value) => validateInput(pattern, value),
        })}
      />
    </label>
  );
}
