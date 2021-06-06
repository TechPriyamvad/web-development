let board = document.querySelector('#board');
let menuBarSel = document.querySelector('.menu-bar');

board.height = window.innerHeight;
board.width = window.innerWidth;

let tool = board.getContext('2d');

//default color of line
let lineColor = "black";
//default width of line
let linewidth = 0;

tool.lineWidth = linewidth;

//draw line when mouse is in down position
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

//draw line when mouse is in moving and down position
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

//stop drawing line when mouse is released
document.body.addEventListener('mouseup',function(e)
{
    isMouseDown = false;
    e.preventDefault();   
})

//get accurate position of y coordinate of a line
function getCoordinates(y)
{
    let obj = menuBarSel.getBoundingClientRect();
    return y-obj.height;
}

//select color of the line
let lineColorSelector = menuBarSel.querySelectorAll('.color-panel .color');
lineColorSelector.forEach(function(ele)
{
    
    ele.addEventListener('click',function(clr)
    {
        lineColor = clr.target.getAttribute('color');
        tool.strokeStyle = lineColor;
    })
})

//select width of the line
let lineWidthSelector = menuBarSel.querySelector('.line-width');

lineWidthSelector.addEventListener('click',function(e)
{
    
    if(e.target.hasAttribute('width'))
    {
        
        linewidth = Number(e.target.getAttribute('width'));
        tool.lineWidth = linewidth;
    }
})

//erase content on board
let erasePageSel = menuBarSel.querySelector('.erase-page');

erasePageSel.addEventListener('click',function(e)
{
    tool.clearRect(0, 0, board.width, board.height);
})
