import React from 'react';

type InputProps = {
  name: string;
  id: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

export default function TextInput(props: InputProps) {
  const { name, id, placeholder, onChange, value } = props;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    onChange(target.value);
  };

  return (
    <label htmlFor={id}>
      {name}
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
