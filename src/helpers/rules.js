/**
 * Regras de validação para o Vuetify.
 * @private
 */

export const required = [
  (value) => !!value || 'Preenchimento obrigatório!'
]

export const email = [
  ...required,
  (value) => (value.length >= 6 && /@/.test(value)) || 'E-mail inválido!'
]

export const password = [
  ...required,
  (value) => value.length >= 8 || 'Senha inválida!'
]

export const cnpj = [
  ...required,
  (value) => {
    const message = 'CNPJ inválido!'
    if (typeof value !== 'string') {
      return message
    }

    const digits = value.replace(/[\D]/gi, '')

    if (digits.length !== 14) {
      return message
    }

    let dig1 = 0
    let dig2 = 0

    const validation = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    const digito = parseInt(digits.charAt(12) + digits.charAt(13))

    const getRest = dig => (((dig % 11) < 2) ? 0 : (11 - (dig % 11)))

    validation.map((v, i) => {
      dig1 += (i > 0 ? (digits.charAt(i - 1) * v) : 0)
      dig2 += digits.charAt(i) * v
    })

    dig1 = getRest(dig1)
    dig2 = getRest(dig2)

    return (((dig1 * 10) + dig2) === digito) || message
  }
]
