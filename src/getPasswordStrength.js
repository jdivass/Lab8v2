
const getPasswordStrength = (password) => {
    if (password === null) return "vacía"
    
    if (password.length < 8) return "debil"

    if (!/\d/.test(password) && !/\W/.test(password) && password.length > 8 ) return "media"

    if (/\d/.test(password) && password.length >= 8) return "fuerte"

    if (/\d/.test(password) && /\W/.test(password) && password.length > 8 ) return "muy fuerte"

}