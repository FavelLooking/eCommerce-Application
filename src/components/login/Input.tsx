import React from 'react';
import { InputProps } from '../../types/types';

export default function Input(props: InputProps) {
  const { name, id, placeholder, onChange } = props;

  return (
    <label htmlFor={id}>
        Email
        <input
          name={name}
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={() => {
            const target =  document.getElementById(id) as HTMLInputElement;
            onChange(target.value);
          }}
        />
      </label>
  );
}
