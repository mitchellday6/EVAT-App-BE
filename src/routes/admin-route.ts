import express from 'express';
import { isAdminAuthenticated } from '../middlewares/is-admin-auth';
import {
  listUsers,
  deleteUser,
  updateUser,
  getLogs,
  getInsights
} from '../controllers/admin-controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin control panel features
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', isAdminAuthenticated, listUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete('/users/:id', isAdminAuthenticated, deleteUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated
 */
router.put('/users/:id', isAdminAuthenticated, updateUser);

/**
 * @swagger
 * /api/admin/logs:
 *   get:
 *     summary: Get admin logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logs data
 */
router.get('/logs', isAdminAuthenticated, getLogs);

/**
 * @swagger
 * /api/admin/insights:
 *   get:
 *     summary: Get data insights
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Insights data
 */
router.get('/insights', isAdminAuthenticated, getInsights);

export default router;
