function validationInput(pattern: RegExp, value: string): boolean {
  return pattern.test(value);
}

export default validationInput;
