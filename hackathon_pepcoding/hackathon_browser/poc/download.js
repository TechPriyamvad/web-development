let downloadBtn = document.querySelector('.menu-bar .fa-download');

downloadBtn.addEventListener('click',download);
function download()
{
    let board = document.querySelector("#board");
    board.width = window.innerWidth;
    board.height = window.innerWidth;

    // let tool = board.getContext('2d');
    //tool.drawImage(board,0,0);
    let link = document.createElement('a');
    link.download='image.png';
    link.href = board.toDataURL();
    link.click();
    link.remove();
    board.remove();
}