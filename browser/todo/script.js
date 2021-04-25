//  dom node 
let input = document.querySelector(".input_box");
let ul = document.querySelector(".task-list");
// let li = document.querySelector(".task");
input.addEventListener("keydown", function (e) {
    //  e object -> describe -> event 
    // console.log(" some key was pressed");
    //console.log("event object", e);

    if (e.key == "Enter") {
        // console.log("user want to enter a task");
        
        //get text entered by user
        let task = input.value;
        //  create any html tag 
        //console.log(task);

        //create a element/node to add into tree
        let li = document.createElement("li");

        //provide text to a element
        li.innerText = task;

        //deleting an element on double click
        li.addEventListener("dblclick", function (e) {
            li.remove();
        })

        //add any attribute 
        li.setAttribute("class", "task");

        //include newly created element into tree
        ul.appendChild(li);

        //resetting value of input tag
        input.value = "";
    }
});