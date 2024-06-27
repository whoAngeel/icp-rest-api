import { getCurrentDate } from "../helpers/CurrentDate";
import { IHistory, IImage, ILocation, IReport } from "../types/report.type";

export class Reports implements IReport {
    id: string
    description: string
    images?: IImage[]
    status: "pendiente" | "en proceso" | "resuelto";
    location: ILocation
    createdAt: Date;
    history: IHistory[] = []
    public constructor(
        id: string,
        description: string,
        images: IImage[],
        location: ILocation
    ) {
        this.id = id
        this.description = description
        this.images = images
        this.status = 'pendiente'
        this.createdAt = getCurrentDate()
        this.location = location
        this.history.push({
            description: "Creando el reporte",
            date: getCurrentDate()
        })
    }

    public addHistory(description: string){
        this.history.push({
            description,
            date: getCurrentDate()
        })
    }

    public updateStatus(status: 'pendiente' | 'en proceso' | 'resuelto'){
        this.status=status
        this.addHistory(`Actualizando el reporte ${this.id} a ${status}.`)
    }
    // END CLASS
}