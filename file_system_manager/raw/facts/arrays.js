// In javascript reality, there is no array -> array is emulated

function sayHi()
{
    console.log("I am outer sayHi");
}

let arr = [
    1,
    1.1,
    "string",
    null,
    true,
    {
        name:"jasbit",
        lastname:"singh"
    },
    [1,2,3,4,5,6],
    function sayHi(){
        console.log("hello from sayHi");
        return "hello";
    }
];

//get feature in array
//console.log("val at idx 3",arr[3]);
//let obj=arr[5];
console.log("val at idx 5",arr[5].name);
//console.log("val at idx 7",arr[7]());
//sayHi();
// loop

/*for(let i=0;i < arr.length;i++)
{
    console.log(i,":",arr[i]);
}
*/

//update
//arr[5]="value";

//arr[95]="some val";

//addLast -> push
//removeLast -> pop
//arr.pop()
//addFirst -> unshift
//remove first -> shift
//give copy of sliced arr
//let sliced = arr.slice(2,4)
//remove entries from array
//let removedEntries=arr.splice(2,2);
let string="priyam";
let strArr=string.split(" ");
let joinedstr=strArr.join("+");
console.log(strArr);
console.log(joinedstr);