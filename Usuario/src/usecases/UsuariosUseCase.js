// // Casos de uso para el manejo de usuarios.
// // Acá va la lógica de negocio agnóstica a los frameworks,
// // recibiendo como parámetros las dependencias necesarias.

// class UsuariosUseCase {

//   constructor(usersRepository) {
//     this.usersRepository = usersRepository;
//   }

//   async getUsers() {
//     return await this.usersRepository.getUsers();
//   }

//   async getUser(id) {
//     return await this.usersRepository.getUser(id);
//   }

//   async createUser(data) {
    
//     const user = new User(undefined, data.title, data.author, data.pages);
//     const id = await this.usersRepository.createUser(user);
//     user.id = id;

//     return user;

//   }

//   async updateUser(id, data) {
//     const user = new User(id, data.name, data.email, data.password, data.is_admin);
//     await this.usersRepository.updateUser(user);
//     return user;
//   }

//   async deleteUser(id) {
//     await this.usersRepository.deleteUser(id);
//   }

// }

// export default UsuariosUseCase