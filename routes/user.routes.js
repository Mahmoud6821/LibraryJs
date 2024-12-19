import * as userController from "../controllers/user.controller.js";
import { Router } from "express";
const router = Router();

router.post("/signUp", userController.signUp);
router.get("/login", userController.user_login);
router.put("/update_user/:user_id", userController.update_user);
router.delete("/delete_user/:user_id", userController.delete_user);

export default router;
