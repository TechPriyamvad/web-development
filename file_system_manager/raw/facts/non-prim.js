let obj= {
    name: "priyamvad",
    lastname: "acharya",
    address: {
        city:"mathura",
        state:"uttar pradesh"
    },
    isAvenger: false,
    age: 35,
    movies: ["civil war","first avenger","age of ultrons"],
    sayhi: function(param)
    {
        console.log("cap say's hi",param);
        return "return blessings";
    }
}

//loop
for(let itr in obj)
{
    console.log("key :",itr,"[value :",obj[itr]);
    console.log("key :",itr, "[value :",obj.itr);
}

console.log(obj.abc);

//get
let key="address";
console.log("address object",obj[key]);
console.log("address object",obj.address);
console.log("address object",obj.address.state);
console.log("Movie",obj.movies[1]);
console.log("fucntion is inside an object",obj.sayhi("i am a param"));

//set -> update
console.log(obj);
console.log("''''''''''''''''''''''''''''''''''''''''''");
obj.friends=["peter","thor","tony"];
obj.age=36;
obj[key]["state"]="delhi";

//delete
delete obj.movies;
console.log("''''''''''''''''''''''''''''''''''''''''''");

console.log(obj);

//function sayHi()
//{
    //while(true);
    //return 30;
//}

//let a=10+sayHi();
//console.log(a);
//console.log("hello",sayHi());