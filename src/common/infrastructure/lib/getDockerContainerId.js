import fs from 'fs/promises';

async function getDockerContainerId() {
  const path = '/proc/self/cgroup';

  try {
    await fs.access(path);
  } catch (err) {
    console.log('Not running inside a Docker container');
    return null;
  }

  try {
    const data = await fs.readFile(path, 'utf8');

    // Extract Docker container ID from cgroup data
    const [idLine] = data.split('\n');
    const [, , containerId] = idLine.split('/');

    return containerId;
  } catch (err) {
    console.error(err);
    return null;
  }
}

getDockerContainerId()
  .then(containerId => {
    if (containerId) {
      console.log(containerId); // outputs the Docker container ID
    }
  })
  .catch(console.error);
