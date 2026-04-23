const deviceState = {
  ip: "192.168.1.16",
  port: "554",
  stream: "stream1",
  username: "ID",
  password: "PW"
};

function buildRtspUrl() {
  return `rtsp://${deviceState.username}:${deviceState.password}@${deviceState.ip}:${deviceState.port}/${deviceState.stream}`;
}

function updateRtspUrl() {
  document.getElementById("rtspUrl").textContent = buildRtspUrl();
}

function updateStreamInfo() {
  document.getElementById("currentStream").textContent = deviceState.stream;

  if (deviceState.stream === "stream1") {
    document.getElementById("resolutionText").textContent = "Main stream";
  } else {
    document.getElementById("resolutionText").textContent = "Sub stream";
  }
}

function setStatus(message) {
  document.getElementById("statusText").textContent = message;
}

function selectStream(streamName) {
  deviceState.stream = streamName;
  updateStreamInfo();
  updateRtspUrl();
  setStatus(`${streamName} selected`);
}

function initializeUi() {
  document.getElementById("ipAddress").textContent = deviceState.ip;
  document.getElementById("portNumber").textContent = deviceState.port;
  updateStreamInfo();
  updateRtspUrl();
  setStatus("Ready");
}

window.onload = initializeUi;