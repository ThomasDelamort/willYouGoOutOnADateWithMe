import { Router } from "express";
import { setDate, getDate } from "../controller/date.controller.js";

const router = Router();

router.post("/", setDate);
router.get("/", getDate);

export default router;
