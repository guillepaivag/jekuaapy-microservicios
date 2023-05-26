import { Timestamp } from 'firebase-admin/firestore'

export class Tema {
    uid: string
    nombre: string
    orden: number
    uidEquipo: string
    uidProyecto: string
    fechaCreacion: Timestamp
}