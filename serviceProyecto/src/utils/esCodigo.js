function esCodigo (cadena) {
    return /^[a-zA-Z0-9-]+$/.test(cadena)
}

export default esCodigo