import express from "express";
import { deleteEmployee, employeebyid, EmployeeRegister, getAllEmployee, UpdateEmployee } from "../Controller/Employee.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router=express.Router();

router.route("/employees").post(isAuthenticated,EmployeeRegister);
router.route("/employees/:id").put(isAuthenticated,UpdateEmployee);
router.route("/employees/delete/:id").delete(isAuthenticated,deleteEmployee);
router.route("/employees/getAlluser").get(isAuthenticated,getAllEmployee);
router.route("/:id").get(isAuthenticated,employeebyid);
export default router;



