const Hall = require('../models/Hall');

// Build seat grid from rows/cols config
const buildDefaultLayout = (rows, cols) => {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const rowLetter = String.fromCharCode(65 + r); // A, B, C...
      seats.push({
        seatId: `${rowLetter}${c + 1}`,
        type: 'regular',
        row: r,
        col: c,
        isActive: true,
      });
    }
  }
  return seats;
};

// GET /api/halls?branch=<branchId>
exports.getHalls = async (req, res) => {
  const query = {};
  if (req.query.branch) query.branch = req.query.branch;
  // Branch managers see only their branch
  if (req.user.role === 'branch_manager') {
    query.branch = req.user.assignedBranch;
  }
  const halls = await Hall.find(query).populate('branch', 'name city');
  res.json({ success: true, count: halls.length, halls });
};

// GET /api/halls/:id
exports.getHallById = async (req, res) => {
  const hall = await Hall.findById(req.params.id).populate('branch', 'name city');
  if (!hall) return res.status(404).json({ success: false, message: 'Hall not found.' });
  res.json({ success: true, hall });
};

