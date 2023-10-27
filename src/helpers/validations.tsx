export const validateEmail = (email: string): boolean => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
}
  
export const validateCPF = (cpf: string): boolean => {
    const regex = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    return regex.test(cpf);
}

export const validateTransitBoard = (transitBoard: string): boolean  => {
    const regex = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/
    return regex.test(transitBoard);
}