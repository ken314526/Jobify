const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getMyJobs,
  updateJob,
  deleteJob,
  toggleJobStatus,
} = require('../controllers/jobController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', createJob);
router.get('/', getJobs);
router.get('/my', getMyJobs);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.put('/:id/toggle-status', toggleJobStatus);

module.exports = router;