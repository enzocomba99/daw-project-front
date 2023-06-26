import { RecursoTecnologico } from "./recurso-tecnologico";

export interface EspacioFisico {
    id: string;
    nombre: string;
    descripcion: string;
    capacidad: number;
    habilitado: boolean;
    recursos: RecursoTecnologico[];
}
