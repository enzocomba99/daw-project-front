import { EspacioFisico } from "./espacio-fisico";

export interface Reserva {
    id: string;
    fechaHoraDesdeReserva: Date;
    fechaHoraHastaReserva: Date;
    fechaCreacion: Date;
    motivoReserva: string;
    estado: any;
    espacioFisico: EspacioFisico;
    cliente: any;
}
