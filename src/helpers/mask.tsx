export const cpfMask = (cpf: string) => {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

export const decimalMask = (inputValue: string) => {
  inputValue = inputValue.replace(/[^\d.]/g, '');

  const decimalCount = inputValue.split('.').length - 1;
  if (decimalCount > 1) {
    const parts = inputValue.split('.');
    inputValue = parts[0] + '.' + parts.slice(1, parts.length).join('');
  }

  const decimalParts = inputValue.split('.');
  if (decimalParts[1] && decimalParts[1].length > 2) {
    inputValue = decimalParts[0] + '.' + decimalParts[1].substring(0, 2);
  }

  return inputValue;
};