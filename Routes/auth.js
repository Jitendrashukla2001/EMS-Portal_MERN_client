import express from "express";
import { login, Logout, NewadminUser, Register, verifyNewAdminUser } from "../Controller/AuthUser.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router=express.Router();

router.route("/register").post(Register)
router.route("/login").post(login)
router.route("/logout").post(Logout)
router.route("/newAdmin").get(isAuthenticated,NewadminUser)
router.route("/updateAdminUser").post(isAuthenticated,verifyNewAdminUser)
export default router;



