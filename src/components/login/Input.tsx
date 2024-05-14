import React from 'react';

type InputProps = {
  name: string;
  id: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

export default function Input(props: InputProps) {
  const { name, id, placeholder, onChange, value } = props;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target  as HTMLInputElement;
    target.setCustomValidity('');
    onChange(target.value);
  }

  return (
    <label htmlFor={id}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
        <input
          name={name}
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
    </label>
  );
}
