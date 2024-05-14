import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, id, ...rest }, ref) => (
    <label htmlFor={name}>
      {name}
      <input
        id={id}
        name={name}
        type="text"
        placeholder={`type your ${name}...`}
        ref={ref}
        {...rest}
      />
    </label>
  )
);
