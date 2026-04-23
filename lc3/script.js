const STORAGE_KEY = "lc3DeviceSettings";

const defaultDeviceState = {
  ip: "192.168.1.16",
  port: "554",
  stream: "stream1",
  username: "ID",
  password: "PW"
};

const deviceState = {
  ...defaultDeviceState
};

function buildRtspUrl() {
  return `rtsp://${deviceState.username}:${deviceState.password}@${deviceState.ip}:${deviceState.port}/${deviceState.stream}`;
}

function buildApiBaseUrl() {
  return `http://${deviceState.ip}/api`;
}

function updateRtspUrl() {
  document.getElementById("rtspUrl").textContent = buildRtspUrl();
}

function updateApiPreview() {
  document.getElementById("apiBaseUrl").textContent = buildApiBaseUrl();
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
  document.getElementById("userIdText").textContent = deviceState.username;
}

function updateInputFields() {
  document.getElementById("inputIp").value = deviceState.ip;
  document.getElementById("inputPort").value = deviceState.port;
  document.getElementById("inputId").value = deviceState.username;
  document.getElementById("inputPw").value = deviceState.password;
}

function setStatus(message) {
  document.getElementById("statusText").textContent = message;
}

function saveDeviceSettings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deviceState));
}

function loadDeviceSettings() {
  const savedValue = localStorage.getItem(STORAGE_KEY);

  if (!savedValue) {
    return;
  }

  try {
    const parsed = JSON.parse(savedValue);

    deviceState.ip = parsed.ip || defaultDeviceState.ip;
    deviceState.port = parsed.port || defaultDeviceState.port;
    deviceState.stream = parsed.stream || defaultDeviceState.stream;
    deviceState.username = parsed.username || defaultDeviceState.username;
    deviceState.password = parsed.password || defaultDeviceState.password;
  } catch (error) {
    console.error("Failed to load saved device settings:", error);
  }
}

function selectStream(streamName) {
  deviceState.stream = streamName;
  updateStreamInfo();
  updateRtspUrl();
  saveDeviceSettings();
  setStatus(`${streamName} selected and saved`);
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
  updateApiPreview();
  saveDeviceSettings();
  setStatus("Device input applied and saved");
}

function resetDeviceInputs() {
  deviceState.ip = defaultDeviceState.ip;
  deviceState.port = defaultDeviceState.port;
  deviceState.stream = defaultDeviceState.stream;
  deviceState.username = defaultDeviceState.username;
  deviceState.password = defaultDeviceState.password;

  updateInputFields();
  updateDeviceInfo();
  updateStreamInfo();
  updateRtspUrl();
  updateApiPreview();
  saveDeviceSettings();
  setStatus("Device settings reset to default");
}

async function copyRtspUrl() {
  const rtspUrl = buildRtspUrl();

  try {
    await navigator.clipboard.writeText(rtspUrl);
    setStatus("RTSP URL copied to clipboard");
  } catch (error) {
    console.error("Copy failed:", error);
    setStatus("Copy failed. Please copy RTSP URL manually");
  }
}

function showVlcGuide() {
  const guideMessage =
    "VLC guide:\n1. Open VLC\n2. Media > Open Network Stream\n3. Paste the copied RTSP URL\n4. Click Play";

  alert(guideMessage);
  setStatus("VLC guide displayed");
}

function sendApiCommand(commandName) {
  const apiBaseUrl = buildApiBaseUrl();
  let endpoint = "";

  if (commandName === "record") {
    endpoint = "/record/start";
  } else if (commandName === "reboot") {
    endpoint = "/system/reboot";
  } else if (commandName === "eisToggle") {
    endpoint = "/video/eis/toggle";
  } else {
    endpoint = "/unknown";
  }

  setStatus(`API placeholder: POST ${apiBaseUrl}${endpoint}`);
}

function initializeUi() {
  loadDeviceSettings();
  updateInputFields();
  updateDeviceInfo();
  updateStreamInfo();
  updateRtspUrl();
  updateApiPreview();
  setStatus("Ready");
}

window.onload = initializeUi;