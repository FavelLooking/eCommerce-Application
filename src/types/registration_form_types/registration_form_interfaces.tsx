interface InputStatus {
  onValidationChange: (isValid: boolean) => void;
  selectedCountry?: string;
}

export default InputStatus;
