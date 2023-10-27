// middleware/security.js
function inputIsMalicious(input) {
  // Check for potential SQL injection
  const maliciousPatterns = [/SELECT.*FROM/, /DROP TABLE/, /--/];
  for (const pattern of maliciousPatterns) {
    if (pattern.test(input)) {
      return true;
    }
  }
  return false;
}

function security(req, res, next) {
  const zipCode = req.query.zipcode;

  if (!zipCode) {
    return res.status(422).json({ message: 'ZIP code is missing' });
  }

  // Check if the ZIP code is in a valid format
  const zipCodePattern = /^\d{5,6}$/; // Assumes a 6-digit ZIP code
  if (!zipCodePattern.test(zipCode)) {
    return res.status(403).json({ message: 'Invalid ZIP code format' });
  }

  if (inputIsMalicious(req.body)) {
    return res.status(400).json({ message: 'Bad Request' });
  } else {
    console.log('Security check passed');
  }
  next();
}

module.exports = security;
