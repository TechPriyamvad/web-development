/****************Canvas template work begins**********/
//create a board to draw 2d images
let board = document.querySelector('#board');
let parent = document.querySelector(".parent");
//take whole height of visual viewport 
board.height = window.innerHeight;

//take whole width of screen
board.width = window.innerWidth;

//for doing 2d drawing on canvas
//To draw onto the canvas we need to get a special reference 
//to the drawing area called a context.
//Type of context->2d
//tool -> 2d canvas object
let tool = board.getContext('2d');

/****************Canvas template work end**********/

/****************Drawing rectangle begins****************/

//set background color of rectangle to be drawn on canvas
//tool.fillStyle = 'rgb(0, 0, 0)';

//drawing a rectangle
//tool.fillRect(50, 50, board.width, board.height);

//draw rectangle on canvas and fill rectangle with green color
//tool.fillStyle = 'green';
//tool.fillRect(50, 50, board.width / 2, board.height / 2);


//tool.fillStyle = 'red';
//tool.fillRect(70, 70, board.width / 2, board.height / 2);


/**********************Drawing rectangle with borders*******/


//border color of rectangle 
//tool.strokeStyle = 'red';

//border width of rectangle
//tool.lineWidth = 5;

//draw a rectangle only with border
//tool.strokeRect(80, 80, board.width / 2, board.height / 2);

/************************Drawing paths**************/


//how to create line
//start drwaing a path,initial start point(0,0)
/*
tool.beginPath();


//move the pen to a different point on the canvas
tool.moveTo(80,80);


//color of line
tool.strokeStyle = 'blue';


//coordinates of line
tool.lineTo(200,80);


//display line
tool.stroke();


//how to create line

tool.beginPath();
tool.moveTo(200,80);
tool.strokeStyle = 'green';
tool.lineTo(200,80);
tool.stroke(); 
*/

/****************************Drawing lines with the help of mouse************************************/
//tool.strokeStyle = 'yellow';
    tool.lineWidth = 6;

    //allow only to draw lines while mouse is being clicked
    let isMouseDown = false;

    //called when mouse is clicked
    document.body.addEventListener('mousedown',function(e){
    //console.log(('mouse is down'));

    //gives x and y coordinates where mouse is clicked
    let x = e.clientX;
    let y = e.clientY;
    
    y = getCoordinates(y);
    
    isMouseDown = true;
    tool.beginPath();
    tool.moveTo(x,y);
  })

  //to freely draw line in any shape
  //called when hovering mouse over the screen
  document.body.addEventListener('mousemove',function(e)
  {
    let x = e.clientX;
    let y = e.clientY;
    y= getCoordinates(y);
    //console.log(x+" "+y)
    if(isMouseDown)
    {
    tool.lineTo(x,y);
    tool.stroke();
    }
  })

  //called when mouse is released
  document.body.addEventListener('mouseup',function(e)
  {
    isMouseDown = false;
    
  })

  //help to draw line from actual posiution where mouse is clicked and then released
  //it is used when there are elements other than canvas on viewport 
  function getCoordinates(y)
  {
    let obj = parent.getBoundingClientRect();
    return y-obj.height;
  }

  /**********************************Draw lines with color***************************************/
  let lineColorSelector = document.querySelectorAll('.color');
  
  for(let idx=0;idx < lineColorSelector.length;idx++)
  {
    lineColorSelector[idx].addEventListener('click',function(data)
    {
        tool.strokeStyle = data.target.getAttribute('color');
    })
  }

