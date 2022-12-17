const { spawn } = require("child_process");

let slsOfflineProcess;

const finishLoading = () =>
  new Promise((resolve, reject) => {
    slsOfflineProcess.stdout.on("data", (data) => {
      if (data.includes("────────────────────────────────────────────────")) {
        console.log(
          `Serverless: Offline started with PID : ${slsOfflineProcess.pid}`
        );
        resolve("ok");
      }

      if (data.includes("address already in use")) {
        reject(data.toString().trim());
      }
    });

    slsOfflineProcess.on("error", function (err) {
      console.error(err);
      reject(err.message);
    });
  });

async function startSlsOffline() {
  try {
    const cmdArr = "offline start".split(" ");
    slsOfflineProcess = spawn("serverless", cmdArr, {
      shell: true,
      cwd: process.cwd(),
    });
    await finishLoading();
  } catch (error) {
    throw new Error("Failed to start serverless offline.");
  }
}

function stopSlsOffline() {
  slsOfflineProcess.stdin.write("q\n");
  slsOfflineProcess.stdin.pause();
  slsOfflineProcess.kill();

  console.log("Serverless Offline stopped");
}

module.exports = {
  stopSlsOffline,
  startSlsOffline,
};
