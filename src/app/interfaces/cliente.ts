import { Reserva } from "./reserva";

export interface Cliente {
    id: string;
	nombre: string;
	apellido: string;
	dni: string;
	email: string;
	nroTelefono: string;
	reservas: Reserva[]
}