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
