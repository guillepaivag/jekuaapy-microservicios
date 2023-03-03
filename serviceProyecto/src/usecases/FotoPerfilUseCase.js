class FotoPerfilUseCase {
    constructor (fotoPerfilRepository) {
        this.fotoPerfilRepository = fotoPerfilRepository
    }

    async obtenerUrlPublica (prefix = '') {
        return await this.fotoPerfilRepository.obtenerUrlPublica(prefix)
    }

    async eliminar (prefix = '') {
        return await this.fotoPerfilRepository.eliminar(prefix)
    }

    async mover (prefix = '', destino = '') {
        return await this.fotoPerfilRepository.mover(prefix, destino)
    }
}

export default FotoPerfilUseCase