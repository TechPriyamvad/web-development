var colorPicker;
var defaultColor = "#000000";

window.addEventListener("load", startup, false);

function startup() {
    colorPicker = menuBarSel.querySelector('.color-picker');
    colorPicker.value = defaultColor;
    colorPicker.addEventListener("input", updateFirst, false);
    colorPicker.addEventListener("change", updateAll, false);
    colorPicker.select();
}

function updateFirst(event) {
    tool.strokeStyle = event.target.value;
}

function updateAll(event) {
    tool.strokeStyle = event.target.value;
}