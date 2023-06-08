
const health = async(req, res) => {
  const healthCheck = {
    uptime: Math.floor(process.uptime()),
    isExternalServiceAvailable: true
  };

  try {
    res.status(200).json(healthCheck);
  } catch (e) {
    healthCheck.message = e;
    res.status(503).json(healthCheck);
  }
};

export default health;