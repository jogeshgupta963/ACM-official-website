const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const {
  createProject,
  getAllProject,
  getProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.js');

router.route('/').post(auth, admin, createProject).get(getAllProject);

router
  .route('/:project_id')
  .get( getProject)
  .put(auth, admin, updateProject)
  .delete(auth, admin, deleteProject);

module.exports = router;
