import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";

const router = Router()
const userRepository = new UserRepository()

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const rta = await userRepository.registerUser(data)
        if (rta.isOk()) {
            res.status(201).json(rta.getValue())
        } else {
            res.status(400).send(rta.getError())
        }
    } catch (error) {
        res.status(500).send("ERROR_REGISTER_NEW_USER")
    }
})

router.get('/', (req, res) => {
    // TODO: SOLO PARA PRUEBAS
    const users = userRepository.findAll()
    res.json(users)
})
router.get('/:id', (req, res) => {
    const { id } = req.params
    const rta = userRepository.findById(id)
    if (rta.isOk()) {
        res.json(rta.getValue())
    } else {
        res.status(400).send(rta.getError())
    }
})

export default router