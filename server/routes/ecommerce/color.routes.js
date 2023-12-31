import { Router } from "express";
import {
  createColor,
  getAllColors,
  getColorById,
  updateColor,
  deleteColor,
} from "../../controller/ecommerce/color.controllers.js";
import { colorRequestBodyValidator } from "../../validators/ecommerce/color.validators.js";
import { validate } from "../../validators/validate.js";
import {
  verifyPermission,
  verifyJWT,
} from "../../middlewares/auth.middlewares.js";
import { UserRolesEnum } from "../../constants.js";
import { mongoIdPathVariableValidator } from "../../validators/common/mongodb.validators.js";

const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    colorRequestBodyValidator(),
    validate,
    createColor
  )
  .get(validate, getAllColors);

router
  .route("/:colorId")
  .get(mongoIdPathVariableValidator("colorId"), validate, getColorById)
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator("colorId"),
    validate,
    deleteColor
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    colorRequestBodyValidator(),
    mongoIdPathVariableValidator("colorId"),
    validate,
    updateColor
  );

export default router;
