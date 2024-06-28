import { Err, StableBTreeMap, bool, ic } from 'azle';
import { ErrorOr } from '..//entities/ErrorOr';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentDate } from '../helpers/CurrentDate';
import { Reports as Report } from '../entities/report.class';
import { IImage, ILocation } from '../types/report.type';
import { id } from 'azle/src/lib/ic/id';
import { pollForResponse } from '@dfinity/agent/lib/cjs/polling';


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
        let report: Report = new Report(id, description, images, location, ic.caller().toString());
        this.reportsStorage.insert(report.id, report)

        return ErrorOr.ok(report)
    }

    public updateReportStatus(
        id: string,
        status: 'pendiente' | 'en proceso' | 'resuelto',
    ):ErrorOr<Report> {
        const reportOpt = this.reportsStorage.get(id)
        const report = reportOpt.Some
        const updatedReport:Report = {
            ...report,
            status,
            history: [
                ...report.history,
                {description:  `Actualizando el reporte ${report.id} de ${report.status} a ${status}`, date: getCurrentDate()}
            ]
        }
                
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

    private validateUpdate(id: string) : ErrorOr<Report>{ // TODO: ESTO NO SE OCUPA, AUN xd
        const reportOpt = this.reportsStorage.get(id)
        if("None" in reportOpt){
            return ErrorOr.error("Report not found")
        }
        const report = reportOpt.Some
        return ErrorOr.ok(report)
    }

    private isAuthorized(report: Report):bool{
        return ic.caller().toString()===report.creatorAddress;
    }

}