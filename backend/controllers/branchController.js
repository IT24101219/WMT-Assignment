const Branch = require('../models/Branch');

// GET /api/branches
exports.getBranches = async (req, res) => {
  const query = req.query.includeDeleted === 'true' && req.user.role === 'main_manager'
    ? {}
    : { isDeleted: false };
  const branches = await Branch.find(query).populate('manager', 'name email');
  res.json({ success: true, count: branches.length, branches });
};

