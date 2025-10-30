const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, companyName, lastDate } = req.body;
    const job = new Job({
      title,
      description,
      companyName,
      lastDate,
      userId: req.user.id,
    });
    await job.save();
    return res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({ message: 'Error creating job' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ message: 'Error fetching jobs' });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ postedDate: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching user jobs:', error);
    return res.status(500).json({ message: 'Error fetching your jobs' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { title, description, companyName, lastDate, status } = req.body;
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.companyName = companyName || job.companyName;
    job.lastDate = lastDate || job.lastDate;
    if (status) job.status = status;

    await job.save();
    return res.status(200).json({ message: 'Job updated successfully', job });
  } catch (error) {
    console.error('Error updating job:', error);
    return res.status(500).json({ message: 'Error updating job' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    await job.deleteOne();
    return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({ message: 'Error deleting job' });
  }
};

exports.toggleJobStatus = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    job.status = job.status === 'active' ? 'closed' : 'active';
    await job.save();
    return res.status(200).json({ message: 'Job status updated', job });
  } catch (error) {
    console.error('Error toggling job status:', error);
    return res.status(500).json({ message: 'Error updating job status' });
  }
};