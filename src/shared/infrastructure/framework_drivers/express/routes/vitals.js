import os  from 'os';
const vitals = async(req, res) => {
  // Memory usage
  const memoryUsage = process.memoryUsage();

  // Uptime
  const uptime = {
    process: process.uptime(),
    system: os.uptime(),
  };

  // CPU Usage
  const cpuUsage = process.cpuUsage();
  
  // Load Average
  const loadAverage = os.loadavg();

  
  // System info
  const systemInfo = {
    architecture: os.arch(),
    platform: os.platform(),
    cpuCount: os.cpus().length,
    freeMem: os.freemem(),
    totalMem: os.totalmem(),
    homeDir: os.homedir(),
    tempDir: os.tmpdir()
  };

  res.json({
    memoryUsage,
    uptime,
    cpuUsage,
    loadAverage,
    systemInfo
  });
};

export default vitals;