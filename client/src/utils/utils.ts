export const validatePasswordRequirements = (password: string) => {
  return {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!?@#$%^&*_]/.test(password),
  }
}
