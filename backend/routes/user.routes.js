import express from "express";
import multer from 'multer';
import { updateProfilePicture } from "../controllers/auth.controller.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
});

// Configure file filter for multer
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.', false));
    }
};
// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


router.get("/", protectRoute, getUsersForSidebar);


router.patch('/updateProfile', protectRoute, upload.single('profilePicture'), updateProfilePicture);

export default router;
