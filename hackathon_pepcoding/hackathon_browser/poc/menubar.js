let board = document.querySelector('#board');
let menuBarSel = document.querySelector('.menu-bar');

board.height = window.innerHeight;
board.width = window.innerWidth;

let tool = board.getContext('2d');
let lineColor = "black";
let linewidth = 0;
let undoArray = [];
let index = -1;

//default width of line
tool.lineWidth = linewidth;

let isMouseDown = false;

document.body.addEventListener('mousedown',function(e)
{
    let x=e.clientX;
    let y=e.clientY;

    y=getCoordinates(y);

    isMouseDown = true;
    tool.beginPath();
    tool.moveTo(x,y);
})

document.body.addEventListener('mousemove',function(e)
{
    let x = e.clientX;
    let y = e.clientY;
    y = getCoordinates(y);

    if(isMouseDown)
    {
        tool.lineTo(x,y);
        tool.stroke();
    }
    e.preventDefault();
})

document.body.addEventListener('mouseup',function(e)
{
    isMouseDown = false;
    e.preventDefault();
    undoArray.push(tool.getImageData(0, 0, board.width, board.height))
    index += 1;
    // console.log(undoArray);
})

function getCoordinates(y)
{
    let obj = menuBarSel.getBoundingClientRect();
    return y-obj.height;
}

//line color selector
let lineColorSelector = menuBarSel.querySelectorAll('.color-panel .color');
lineColorSelector.forEach(function(ele)
{
    //console.log(ele)
    ele.addEventListener('click',function(clr)
    {
        lineColor = clr.target.getAttribute('color');
        tool.strokeStyle = lineColor;
    })
})

//line width selector
let lineWidthSelector = menuBarSel.querySelector('.line-width');
// console.log(lineWidthSelector)
lineWidthSelector.addEventListener('click',function(e)
{
    // console.log(e.target.hasAttribute('width'));
    if(e.target.hasAttribute('width'))
    {
        // console.log(e.target.getAttribute('width'));
        linewidth = Number(e.target.getAttribute('width'));
        tool.lineWidth = linewidth;
    }
})

//erase content on board
let erasePageSel = menuBarSel.querySelector('.erase-page');

erasePageSel.addEventListener('click',function(e)
{
    tool.clearRect(0, 0, board.width, board.height);
    undoArray = [];
    index = -1;
})

//undo functionality
/* let undoBtn = menuBarSel.querySelector('.undobtn');
// console.log(undoBtn);

undoBtn.addEventListener('click',function(e)
{
    if(index > 0)
    {
        index -= 1;
        undoArray.pop();
        tool.putImageData(undoArray[index],0,0);
    }
}) */