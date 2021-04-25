//file system - > nodejs modules
//google
let fs=require("fs");
let path = require("path");

function isFileChecker(dirPath)
{
    return fs.lstatSync(dirPath).isFile();
}

function readContent(dirPath)
{
    return fs.readdirSync(dirPath);
}

function viewFlat(dirPath)
{
    //path -> file/folder

    let isFile = isFileChecker(dirPath);
    if(isFile == true)
    {
        console.log(dirPath + "*");
    }
    else{
        console.log(dirPath);

        //get childrens
        let childrens = readContent(dirPath);
        for(let i=0;i < childrens.length;i++)
        {
            viewFlat(dirPath + "/" + childrens[i]);
        }
    }
}

function viewTree(dirPath,indent)
{
    let isFile = isFileChecker(dirPath);
    if(isFile == true)
    {
        console.log(indent,path.basename(dirPath)+"*");
        
    }
    else{
        console.log(indent,path.basename(dirPath));
        let childrens = readContent(dirPath);
        for(let i=0;i < childrens.length;i++)
        {
            viewTree(path.join(dirPath,childrens[i]),indent+"\t",);
        }
    }
}
viewTree("C:\\pepcoding_online_placement_program_2021\\web_development\\codes\\projects\\file_system_manager\\raw\\poc","");