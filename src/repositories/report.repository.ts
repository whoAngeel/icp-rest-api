import { Err, StableBTreeMap, ic } from 'azle';
import { ErrorOr } from '..//entities/ErrorOr';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentDate } from '../helpers/CurrentDate';
import { Reports as Report } from '../entities/report.class';
import { IImage, ILocation } from '../types/report.type';


export class ReportRepository {
    private reportsStorage: any
    constructor() {
        this.reportsStorage = StableBTreeMap<string, Report>(1);
    }

    public createReport(
        description: string,
        images: IImage[],
        location: ILocation
    ): ErrorOr<Report> {
        const id = uuidv4()
        let report: Report = new Report(id, description, images, location);
        this.reportsStorage.insert(report.id, report)

        return ErrorOr.ok(report)
    }

    public updateReportStatus(
        id: string,
        status: 'pendiente' | 'en proceso' | 'resuelto',
    ):ErrorOr<Report> {
        const report = this.reportsStorage.get(id)
        const updatedReport:Report = {
            ...report,
            status
        }
        
        let descriptionMsg = `Actualizando el reporte ${report.id} de ${report.status} a ${status}`

        updatedReport.history.push({description: descriptionMsg, date: getCurrentDate()})
        
        this.reportsStorage.insert(id, updatedReport)
        return ErrorOr.ok(updatedReport)

    }

    public findById(id: string):ErrorOr<Report>{
        const report = this.reportsStorage.get(id)
        if("None" in report){
            return ErrorOr.error(`Reporte con el id ${id} no se encontro`)
        }
        return ErrorOr.ok(report.Some)
    }

    public findAll():Report[]{
        return this.reportsStorage.values()
    }

}