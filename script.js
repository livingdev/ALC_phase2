// 'use strict';

// // !simple way to create obj. "obj literal"

// var cat = {name: 'Fluffy', color: 'White'};
// cat.age = 3;
// cat.speak = function() {console.log("Meeoow") }

// cat.speak();

// //2. using constructor function with the new keyword

// function Cat(name, color) {
//   this.name = name
//   this.color = color
// }

// var cat = new Cat('Fluffy', 'White');

// console.log(cat)

// //using the 'new' keyword allows u 2 create multiple instancess of obj 4rm the same obj
// //the 'this' key word creates an obj(dat obj is whateva obj is executing d current bit of code by deflt its the global obj
// //and in a web browser, its the window obj) and the fn assgns ppty n vlu to each of the obj
// //the new keyword creates a new empty js obj for us and assigns the content of this keyword to the object


//3. using object.create
//allows for instances of obj to be created without having to create a constructor fn first especially when only few instances are to be created.
var cat = Object.create(object.prototype, //obj.crt creates a new fn and we are passing in obj that will bcom d prototype 4 our new obj usin 'obj.proto'
{
  name: {
    value: 'Fluffy',
    enumerable:true,
    writable:true,
    configurable:true
  },
  color: {
  value:'White',
  enumerable:true,
  writable:true,
  configurable:true
  }
})

// console.log(cat);
// // all the values set to true automatically for us when we creat obj using any of the other 2 forms

// //4. using ES6 classes

// class Cat {
//   constructor(name, color) {
//     this.name = name
//     this.color = color
//   }
//   //we add method to our class like this:
//   speak() {
//     console.log('Meeooow!')
//   }
// }

// var cat = new Cat('Fluffy', 'White')

// console.log(cat)
// cat.speak();




// //Object Properties

// 'use strict';

// var cat = {
//   name: 'Fluffy',
//   color: 'White'
// }

// //using the dot notation to access obj ppty
// console.log(cat.name)

// //using the bracket notation
// //display(cat['color']); why and when will u use sq bracket notation like this instead of cat.color
// //1. if you want to create an object out of value being entered by a user.
// console.log(cat['color']) // 2.used when u might want to create a property on an obj using a ppty name that is not a valid identify e.g
// //e.g when you want to create an obj out value being entered by a user
// cat['Eye Color'] = 'Green'
// console.log(cat['Eye Color'])

// // every ppty has more than just a name and a value but also a ppty descriptor that we can use to see the attribute of that obj
// //to access this descritor of any ppty of an obj, do
// console.log(Object.getOwnPropertyDescriptor(cat, 'name')) //brings out ppty descrtr for our named obj
// //it returns: {value: "Fluffy", writable: true, enumerable: true, configurable: true}

// //the writable attr dfines whether a ppty value can be changed 4rm its initial value
// //we can change a ppty attr using the object defn ppty method
// Object.defineProperty(cat, 'name', {writable: false})
// //now if we try to change the value of our name ppty, we get error(when we use strict mode) because writable is now set to false
// //cat.name = 'Scratchy';

// //what happens when a non-writable ppty is an object?
// var cat1 = {
//   name: {first: 'Fluffy', last:'LaBaouf'},
//   color: 'Brown'
// }
// //we can still change the vlu of a ppty of an obj that the non-writable ppty is pointing to
// console.log(cat1.name)
// cat1.name.first = 'Sratchy'
// //to prevent the obj 4rm being changed use freeze method
// Object.freeze(cat.name)

// //for...in loop
// //this can be used to loop over each of the ppty in an obj, and we can use the propertyName to get the value of each ppty using the bracket notation discussd earlier thus
// for (var propertyName in cat1) {
//   console.log(propertyName + ': ' + cat1[propertyName]) //displays the ppty name and d vlu since we used d 'bracket' notation discussd earlier
// }


// Object.defineProperty(cat1, 'name', {enumerable: true})
// console.log(Object.keys(cat1)) //to check obj keys use
// //enumerable ppty: when set to true this allows us to loop over the obj ppties using the for...in loop
// //setting enumerable to false: 1.the name property will no longer be returned in the loop when 'enumerable' is set to 'false'.
// //2. it also makes sure that the obj is hidden from the obj keys.
// //3.setting enumerable to false affects jsons serialization of the object

// console.log(JSON.stringify(cat1))
// // returns this {"name":{"first":"Sratchy","last":"LaBaouf"},"color":"Brown"} when set to true
// //and this {"color":"Brown"} when set to false

// //the configurable ppty. setting it to fals, you cannot :
// //1. change the enumerable 2. change d configurable itself 3.cannot delete a ppty
// //4.however, we can still change the writable attr


// //using 'getters' and 'setters'.
// //getters and setters are attrs on a ppty that allows to specify the return vlu of a ppty using a fn and set the vlu of the ppty using a fn.
// //and we can access the ppty just like any other ppty
// //to create getters and setters use defingProperties like this

// Object.defineProperty(cat1, 'fullName', {
//   get: function() {
//     return this.name.first + ' ' + this.name.last
//   },
//   //now use set to set the first and last name
//   set: function(value) {
//     var nameParts = value.split(' ') //splits the string vlu that will be entered at where there is space
//     this.name.first = nameParts[0]
//     this.name.last = nameParts[1]
//   }
// })
// //console.log(cat1.fullName) this code for the get
// cat1.fullName = 'Muffin Top'
// console.log(cat1.fullName)
// console.log(cat1.name.first)





// //JS Prototype and Inheritance
// //Prototypes are the mechanism by which JavaScript objects inherit features from one another.
// 'use strict';

// //e.g of when you might want to use a prototype
// var arr = ['red', 'blue', 'green']
// //to get the last elem of the array, typically u do this:
// var last = arr[arr.length-1] //typical way of getting the last elem of an array
// console.log(last);
// console.log(arr[1]);

// //what if we want to simplify this so we can just ask for the last elem like this: var last = arr.last
// //then prototype comes to play
// // js array doesnt have a 'last' ppty but since js is dynamic we can creat ours using dfnppty so we can call 'last' as a ppty instead of a method

// Object.defineProperty(Array.prototype, 'last', {get: function() {
//   return this[this.length-1]
// }}) //this block defns our own ppty
// var last1 = arr.last
// var arr2 = ['one', 'two', 'three']
// console.log(last1);
// console.log(arr2.last);
// //note this last ppty only applies the abv array, to extend so that any other array we create has a last ppty we use Array.prototype in place of arr above
// //'Array' abv is just a fn, that is meant to be used as a constructor fn
// console.log(Array)
// // the 'Array' synthax is just calling the 'arr' with the new syntax lke this: var arr = new Array(...)



// //so what is a prototype? this is an obj that exists in a every fn in js
// var myFunc = function() {}
// console.log(myFunc.prototype) //prototype is just an empty obj
// //however objects doesn't have a prototype but a _proto_ ppty and is used differently 4rm a prototype ppty of a fn
// var cat = {name: 'Fluffy'}
// console.log(cat._proto_)


// //E.g obj prototype and fn prototype
// 'use strict';

// function vehicle(noise) {
//   //let our vehicle constr take a noise to demonstrate the calling of our vehicle constr in the car const
//   this.noise = noise || 'voooom!'
// }
// vehicle.prototype.sound = function() {
//   console.log(this.noise)
// }

// function Car (name, color) {
//   vehicle.call(this, 'Wooooommm!') // no1. when building a proto chain. calls our vehicle constructor 4rm our car constructor
//   this.name = name
//   this.color = color
// }

// Car.prototype = Object.create(vehicle.prototype) //no2. in building a proto chain. assigns Vehicle as the prototype for the car fn
// Car.prototype.constructor = Car //no3. in building a proto chain.
// //y use 'object.create' instead of 'new'? new will call the vehicle fn and execute while obj.cr will only setup vehicle as the prototype and create the prototype chain

// Car.prototype.age = 4;
// var fluffy = new Car('Fluffy', 'White') //creates a new obj from the fn car
// var muffin = new Car('Muffin', 'Brown')

// // note that they are of the same type and instance to verify do
// console.log(Car.prototype === fluffy.__proto__); //this will return true

// //changing the prototype ppty of the Car fn will also change the prototype ppty of the fluffy obj and any obj created using 'new'
// //simply put, adding a ppty to a fn prototype affects all obj constructed using that fn
// Car.prototype.age = 3 //adds age prototype to the Car fn
// console.log(Car.prototype) //logs the fn prototype
// console.log(fluffy.__proto__) //logs the obj prototype
// console.log(Muffin.__proto__)

// //note that the age ppty lives in the __proto__ ppty of the obj not in the obj. to confirm do
// console.log(fluffy.hasOwnProperty('age'))// false
// //changing the ppty vlu of the fn prototype will change that of the obj but changing the age ppty of the obj will not change the prototype ppty of the fn


// // what if we change the fn protoyp to pnt cmltly diff obj and create a new obj?
// Car.prototype = {age: 5} //this will create a new obj proto entirely
// var snowbell = new Car('snowbell', 'White')
// console.log(fluffy.age) //4: this will continue to pnt to d old obj proto
// console.log(muffin.age) //4: likewise this
// console.log(snowbell.age) //5: points to d new obj proto
// console.log(Car.prototype.age) //5: bcos d fn created a new obj in memory


// //multiple levels of inheritance
// //note that the Car prototype has a hidden prototype also
// console.log(fluffy.__proto__.__proto__)

// //creating our own prototype of inheritance chain
// // assuming we want our Car to inherit ppty 4rm a parent called vehicle
// //now we can make fluffy sound
// fluffy.sound()
// console.log(fluffy)//Car
// console.log(fluffy.__proto__.__proto__)//vehicle



//Using 'class' to replace the constr fn vehicle
class vehicle {
  constructor(noise) {
    this.noise = noise || 'voooom!'
  } // this block of code replaces the 'function vehicle' block

  //then we add a 'sound' method to our class
  sound() {
  console.log(this.sound)
  } //this block will replace the 'vehicle.prototype.sound' block
}

//then add a Car class that extends from the vehicle class
class Car extends vehicle { //'extends' is used to setup the inheritance chain
  constructor(name, color) {
    super('Voooom') //Car uses the 'super' keyword to call its parent class constructor; vehicle
    this.name = name
    this.color = color
  }
} //this block replacees the 'function Car' block and the 'object.create, 'car.prototype.constructor' block


