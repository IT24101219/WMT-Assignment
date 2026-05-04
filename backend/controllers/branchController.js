const Branch = require('../models/Branch');

// GET /api/branches
exports.getBranches = async (req, res) => {
  const query = req.query.includeDeleted === 'true' && req.user.role === 'main_manager'
    ? {}
    : { isDeleted: false };
  const branches = await Branch.find(query).populate('manager', 'name email');
  res.json({ success: true, count: branches.length, branches });
};

// GET /api/branches/:id
exports.getBranchById = async (req, res) => {
  const branch = await Branch.findById(req.params.id).populate('manager', 'name email');
  if (!branch) return res.status(404).json({ success: false, message: 'Branch not found.' });
  res.json({ success: true, branch });
};
