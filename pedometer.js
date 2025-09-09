let stepCount = 0;
let lastAcceleration = { x: 0, y: 0, z: 0 };
let stepThreshold = 12; // Adjust this threshold experimentally

function handleMotion(event) {
    const acc = event.accelerationIncludingGravity;

    if (!acc) return;

    // Calculate overall acceleration magnitude
    const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);

    // Detect peaks (when the magnitude crosses a threshold)
    if (magnitude > stepThreshold &&
        (Math.abs(acc.x - lastAcceleration.x) > 1 ||
            Math.abs(acc.y - lastAcceleration.y) > 1 ||
            Math.abs(acc.z - lastAcceleration.z) > 1)) {
        stepCount++;
        document.getElementById("steps").textContent = stepCount;
    }

    lastAcceleration = { ...acc };
}

if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", handleMotion, true);
} else {
    alert("DeviceMotion not supported on this device/browser.");
}