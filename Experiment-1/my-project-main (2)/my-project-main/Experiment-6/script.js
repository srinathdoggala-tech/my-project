const svg = document.getElementById("drawingArea");
let drawing = false;
let currentPath = null;

function getMousePosition(evt) {
    const rect = svg.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

svg.addEventListener("mousedown", (e) => {
    drawing = true;
    const pos = getMousePosition(e);

    currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    currentPath.setAttribute("d", `M ${pos.x} ${pos.y}`);
    currentPath.setAttribute("stroke", "blue");
    currentPath.setAttribute("stroke-width", "2");
    currentPath.setAttribute("fill", "none");
    svg.appendChild(currentPath);
});


document.addEventListener("mousemove", (e) => {
    if (!drawing || !currentPath) return;

    
    const rect = svg.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const pos = getMousePosition(e);
        let d = currentPath.getAttribute("d");
        currentPath.setAttribute("d", d + ` L ${pos.x} ${pos.y}`);
    }
});


document.addEventListener("mouseup", () => {
    drawing = false;
    currentPath = null;
});