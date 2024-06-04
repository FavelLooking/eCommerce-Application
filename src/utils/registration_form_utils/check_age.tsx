import minAge from './birth_date_input_min_age';

function checkAge(date: string): boolean {
  const currentDate = new Date();
  const birthDate = new Date(date);
  const diffYears = currentDate.getFullYear() - birthDate.getFullYear();
  const isOldEnough =
    diffYears > minAge ||
    (diffYears === minAge &&
      currentDate.getMonth() >= birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate());
  return isOldEnough;
}

export default checkAge;
