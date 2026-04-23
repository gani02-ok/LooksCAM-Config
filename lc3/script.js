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

function updateDeviceInfo() {
  document.getElementById("ipAddress").textContent = deviceState.ip;
  document.getElementById("portNumber").textContent = deviceState.port;
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

function applyDeviceInputs() {
  const inputIp = document.getElementById("inputIp").value.trim();
  const inputPort = document.getElementById("inputPort").value.trim();
  const inputId = document.getElementById("inputId").value.trim();
  const inputPw = document.getElementById("inputPw").value.trim();

  deviceState.ip = inputIp || deviceState.ip;
  deviceState.port = inputPort || deviceState.port;
  deviceState.username = inputId || deviceState.username;
  deviceState.password = inputPw || deviceState.password;

  updateDeviceInfo();
  updateRtspUrl();
  setStatus("Device input applied");
}

function initializeUi() {
  document.getElementById("inputIp").value = deviceState.ip;
  document.getElementById("inputPort").value = deviceState.port;
  document.getElementById("inputId").value = deviceState.username;
  document.getElementById("inputPw").value = deviceState.password;

  updateDeviceInfo();
  updateStreamInfo();
  updateRtspUrl();
  setStatus("Ready");
}

window.onload = initializeUi;