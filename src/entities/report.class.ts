import { getCurrentDate } from "../helpers/CurrentDate";
import { IHistory, IImage, ILocation, IReport } from "../types/report.type";

export class Reports implements IReport {
    id: string
    description: string
    images?: IImage[]
    status: "pendiente" | "en proceso" | "resuelto";
    location: ILocation
    createdAt: Date;
    creatorAddress: string
    history: IHistory[] = []
    public constructor(
        id: string,
        description: string,
        images: IImage[],
        location: ILocation,
        creatorAddress: string
    ) {
        this.id = id
        this.description = description
        this.images = images
        this.creatorAddress = creatorAddress
        this.status = 'pendiente'
        this.createdAt = getCurrentDate()
        this.location = location
        this.history.push({
            description: "Creando el reporte",
            date: getCurrentDate(),
            author: creatorAddress

        })
    }

    public addHistory(description: string, author: string){
        this.history.push({
            description,
            date: getCurrentDate(),
            author,
        })
    }

   
    // END CLASS
}