import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products/add",checkPermission,create)
router.delete("/products/:id",checkPermission, remove);
router.patch("/products/:id",checkPermission, update);

export default router;
