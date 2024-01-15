import { Router } from "express";

const router = Router()

router.get('/teste', (req, res) => {
    console.log('/teste')
    return res.send("OK");
})

export { router }