
const getPasswordStrength = (password) => {
    if (password.length === 0) return "vacía"

    if (password.length == 7) return "débil"

    if (password.length == 8 && !/\d/.test(password)) return "media"
    
    if (/\d/.test(password) && /\W/.test(password) && password.length >= 8 ) return "muy fuerte"

    if (/\d/.test(password) && password.length >= 8) return "fuerte"

    if (!/\d/.test(password) && !/\W/.test(password) && password.length >= 8 ) return "media"

    if (password.length < 8) return "débil"
    
}

export default getPasswordStrength