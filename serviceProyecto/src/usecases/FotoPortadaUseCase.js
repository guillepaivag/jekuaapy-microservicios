class FotoPortadaUseCase {
    constructor (fotoPortadaRepository) {
        this.fotoPortadaRepository = fotoPortadaRepository
    }

    async obtenerUrlPublica (prefix = '') {
        return await this.fotoPortadaRepository.obtenerUrlPublica(prefix)
    }

    async eliminar (prefix = '') {
        return await this.fotoPortadaRepository.eliminar(prefix)
    }

    async mover (prefix = '', destino = '') {
        return await this.fotoPortadaRepository.mover(prefix, destino)
    }
}

export default FotoPortadaUseCase