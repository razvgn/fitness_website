import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import {
  authentication,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authentication, authorizedAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authentication, getCurrentUserProfile)
  .put(authentication, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authentication, authorizedAdmin, deleteUserById)
  .get(authentication, authorizedAdmin, getUserById)
  .put(authentication, authorizedAdmin, updateUserById);

export default router;
