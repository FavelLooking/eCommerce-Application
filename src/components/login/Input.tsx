import React from 'react';
import { InputProps } from '../../types/types';

export default function Input(props: InputProps) {
  const { name, id, placeholder, onChange } = props;

  return (
    <div>
      <label htmlFor={id}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
        <input
          name={name}
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={() => {
            const target = document.getElementById(id) as HTMLInputElement;
            target.setCustomValidity('');
            onChange(target.value);
          }}
        />
      </label>
    </div>
  );
}
