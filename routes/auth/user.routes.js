import express from "express";
import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUnblockUser,
} from "../../controller/auth/user.controllers.js";
import {
  verifyJWT,
  verifyPermission,
} from "../../middlewares/auth.middlewares.js";
import { UserRolesEnum } from "../../constants.js";
import { validate } from "../../validators/validate.js";
import {
  mongoIdPathVariableValidator,
  mongoIdRequestBodyValidator,
} from "../../validators/common/mongodb.validators.js";

const router = Router();

router.route("/").get((req, res) => {
  res.send("Welcome to the E-commerce App!");
});

router.route("/register").post(validate, registerUser);
router.route("/login").post(
  // validate,
  loginUser
);
router.route("/all-users").get(verifyJWT, getAllUsers);
/**
* Middleware Execution Order:
  - It's essential to ensure that the middleware responsible for setting req.user is executed before any middleware that relies on req.user. Middleware order matters.
  verifyJWT -> responsible for setting⭐🌟⭐ req.user ⭐🌟⭐
  verifyPermission -> relies on req.user
  Bug: If you put the verifyJWT middleware after the verifyPermission middleware, the verifyPermission middleware will fail because req.user will be undefined.
  verifyJWT -> verifyPermission -> getAUser
*/
router
  .route("/:userId")
  .get(
    mongoIdPathVariableValidator("userId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    getAUser
  )
  .delete(
    mongoIdPathVariableValidator("userId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    deleteAUser
  )
  .patch(mongoIdPathVariableValidator("userId"), verifyJWT, updateAUser);
router
  .route("/block-unblock/:userId")
  .patch(
    mongoIdPathVariableValidator("userId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    blockUnblockUser
  );

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
