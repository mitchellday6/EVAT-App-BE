import express from "express";
import { createRouteFromPoints, createRouteFromSentence } from "../controllers/navigation-controller";

const router = express.Router();

router.post("/from-points", createRouteFromPoints);
router.post("/from-sentence", createRouteFromSentence);

export default router;
