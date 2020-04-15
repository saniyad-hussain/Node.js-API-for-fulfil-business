# Fulfil JavaScript Style Guide

We use a simplified version of the [Google JavaScript StyleGuide](https://google.github.io/styleguide/jsguide.html)
The key things you need to know are highlighted in this document

#### General rules
- We will stick to Google styleguide for JS, but some ares I will be relaxed. Anything in this document is law.
- All code will go through a code review before it is merged to Master.
- Always be looking for things which break the styleguide and fix them
- The IONIC app is written in TypeScript. The API is written in JavaScript. In general the styleguide applies to typescript where applicable, and in JavaScript is absolute.
- Before you request a code review, do a self-review to make sure it complies with the styleguide
- Any time you modify an API endpoint, make sure you update the swagger definition in routes.js. If swagger gets out of sync, it is annoying to fix.
- Functions/methods should do only 1 thing. If you need to do more than 1 thing, extract one of the things to another function.
- The difference between a software engineer and a programmer is that a software engineer always finds simple, elegant solutions to problems. If you find yourself writing super complex code, chance are you need to re-think about how you can simplify it. Keep it simple!

#### Keep the code style consistent
If you happen upon code that does not comply with the style guide, update it.
Try to keep your code consistent with the rest of the code within the file.

#### No dead code in github
```javascript
// The following is unacceptable. NEVER comment out code and submit it.
// Just delete it. The only exception is if you are going to re-enable within
// a few days. In which case, add a comment stating so, with a date.

//for (let i = 0; i < 10; i++) {
//  console.info(i);
//}

//good
// Note(Matt): disabled on 2/15/19 for a demo. Should be re-enabled after
//doCheckout();
```

#### TODOs
Should include the authors name in parenthesis:
```javascript
// bad
// TODO do something

// TODO(Matt): do something
```
#### Naming conventions
- Always stay consistent.
- Always use descriptive names
- Camelcase with the first letter lower case
- Classes always start with an upper case.
- Methods start with a lower case
```javascript
let Example_Name = 3; // bad
let examplename = 3; // bad
let example_name = 3; // bad
let ExampleName = 3; // bad

let exampleName = 3; // good
```

#### Indentation
Set your IDE to 2 spaces for indents. Not 4 spaces, not tabs.

If you have a line longer than 100 chars, wrap it and double indent.
```javascript
// bad
var x = 'Very long line that is over 100 chars long so it must be wrapped but is not which is bad';

// good
var x = 'Very long line that is over 100 chars long so it must be wrapped but' +
    ' is not which is bad';

// bad
this.veryLongFunctionName(longParameter1, longParameter2, longParameter3, longParameter4, longParameter5) {
  // do something
}

// good
this.veryLongFunctionName(longParameter1, longParameter2, longParameter3,
    longParameter4, longParameter5) {
  // do something
}
```

#### Comments
If there are inputs or returns, a JSDoc is required
```javascript
module.exports = {
    /**
     * Types are Number|Boolean|String|Object|ClassName|
     * @param {Number} numToAdd
     * @param {Boolean} isEnabled
     * @param {String} name
     * @return {Object}
     */
    doSomething: function(numToAdd, isEnabled, name) {
        // this is fine
        /* this is also */
        return {
            'answer': 43 /* the answer to everything */
        };
    }

    // Do not add useless comments. If you think a future developer may not
    // understand, add a comment. Do not messy up the code base with
    // tons of comments for self-explanatory things.

    // bad
    let dogsName = 'fido'; // the dogs name

}
```
#### Quotes
Always use single quotes
```javascript
let x = "hello"; // bad
let y = 'world'; // good
```

## Semicolons ARE required!
```javascript
let x = "hello" // bad
let y = 'world'; // good

// bad
let z = {
    'prop': 'val'
}

// good
let z = {
    'prop': 'val'
}
```

#### Don't use var anymore
```javascript
// bad
var example = 42;
// good
let example = 42;
```
#### Arrow functions are preferred
```javascript
// bad
[1, 2, 3].map(function (x) {
  // do something
});

// good
[1, 2, 3].map((x) => {
  // do something
});
```
#### Use template strings instead of concatenation
```javascript
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}
// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}
// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```
#### Constants should be named in ALL_UPPERCASE separated by underscores
```javascript
// bad
const number = 5;
// good
const NUMBER = 5;
```
#### One line per declaration
```javascript
// bad
let a = 1, b = 2, c = 3;
// good
let a = 1;
let b = 2;
let c = 3;
```
