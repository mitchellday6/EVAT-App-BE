import express from 'express';
import { adminLogin, updateAdminCredentials } from '../controllers/admin-auth-controller';
import { isAdminAuthenticated } from '../middlewares/is-admin-auth';

const router = express.Router();

router.post('/login', adminLogin);

/**
 * @swagger
 * tags:
 *   name: Admin Auth
 *   description: Authentication routes for admin
 */

/**
 * @swagger
 * /api/admin-auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.put('/update-credentials', isAdminAuthenticated, updateAdminCredentials);
/**
 * @swagger
 * /api/admin-auth/update-credentials:
 *   put:
 *     summary: Update admin username and password
 *     tags: [Admin Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated
 *       401:
 *         description: Unauthorized
 */


export default router; // ✅ MUST BE HERE!
