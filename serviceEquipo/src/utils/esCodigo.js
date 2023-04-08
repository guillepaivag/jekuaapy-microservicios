function esCodigo (cadena) {
    return /^[a-zA-Z0-9_-]+$/.test(cadena)
}

export default esCodigo