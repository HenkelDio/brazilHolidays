import express from "express"
import holidayController from "./app/controllers/holidayController";
import userController from "./app/controllers/userController";

const router = express.Router()

router.get('/v1/find-all', holidayController.findAll)
router.get('/v1/next-holiday', holidayController.findNextHoliday)

router.post('/v1/user/create', userController.create)
router.post('/v1/user/login', userController.login)

export { router }