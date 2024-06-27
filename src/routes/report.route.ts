import { Router } from "express";
import { ReportRepository } from "../repositories/report.repository";


const router = Router()
const reportRepository = new ReportRepository()


router.post('/', (req, res) => {
    try {
        const { description, images, location } = req.body
        const rta = reportRepository.createReport(description, images, location)
        if (rta.isOk()) {
            res.status(201).json(rta.getValue())
        } else {
            res.status(400).send(rta.getError())
        }
    } catch (error) {
        res.status(500).send("EROR_CREATING_REPORT")
    }
})

router.get('/', (req, res) => {
    const reports = reportRepository.findAll()
    res.json(reports)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const rta = reportRepository.findById(id)
    if (rta.isOk()) {
        const report = {
            ...rta.getValue()
        }
    } else {
        res.status(400).send(rta.getError())
    }
})

export default router