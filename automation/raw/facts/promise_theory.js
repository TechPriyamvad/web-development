let fs = require("fs");

function promiseReadFile(filepath)
{
    //wrap it inside a promise object
    //call resolve where you think work is completed 
    //call reject where you think work is err -> pass data
    //resolve function
    return new Promise(function (resolve,reject)
    {
        fs.readFile(filepath,function cb(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        });
    });
}
