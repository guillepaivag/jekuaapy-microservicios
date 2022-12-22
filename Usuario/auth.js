// Authentication
import FirebaseAuthenticationRepository from "./src/repositories/FirebaseAuthenticationRepository.js"
import AuthenticationUseCase from "./src/usecases/AuthenticationUseCase.js"
const authenticationUseCase = new AuthenticationUseCase(new FirebaseAuthenticationRepository())

async function main (uid) {
    const usuarioAuth = await authenticationUseCase.obtenerPorUID(uid)
    console.log('usuarioAuth', usuarioAuth)

    return usuarioAuth
}