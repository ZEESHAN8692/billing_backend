import express from "express";

import upload from "../../middleware/imageUpload.js";
import AuthenticationController from "../../controller/AuthenticationController/AuthenticationController.js";
import { AuthCheck } from "../../middleware/authCheck.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  AuthenticationController.register
);
router.post("/login", AuthenticationController.login);
router.get("/profile-details", AuthCheck, AuthenticationController.profile);
router.get("/users", AuthenticationController.users);
router.get("/user/:id", AuthenticationController.singleUser);
export default router;
