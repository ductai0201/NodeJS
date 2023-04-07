import express from "express";
import { create, get, getAll, remove, update } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/categorys", getAll);
router.get("/categorys/:id", get);
router.post("/categorys",checkPermission,create)
router.delete("/categorys/:id",checkPermission, remove);
router.patch("/categorys/:id",checkPermission, update);

export default router;
