var penWidth;

window.addEventListener("load", startup, false);

function startup()
{
    penWidth = menuBarSel.querySelector('.pen-range');
    penWidth.value = linewidth;
    penWidth.addEventListener("input",updateLine,false);
    penWidth.addEventListener("change",updateAllLine,false);
    penWidth.select();
}

function updateLine(event) {
    linewidth = event.target.value;
    tool.lineWidth = linewidth;
}

function updateAllLine(event) {
    linewidth = event.target.value;
    tool.lineWidth = linewidth;
}