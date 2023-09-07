//wait for first input
//if first input is number, 

//initialize 
let input;
let numx;
let numy;
let operator;
let result;
let screenText = "";
let freshClear = true;
let stack = new Array();

const buttons = document.querySelectorAll("button");
const screen = document.getElementById("#screen");


for (let button of buttons)
{
    button.addEventListener("click", choose);
}

function choose(e)
{
    input = e.target.value;
    
    if (input == "=")//calc if stack is full
    {
        if (stack.length == 3)
        {
            calculate();
            clearCalc();
            numx = result;
            stack.push(numx);
        }
    }
    else if (input == "clear")
    {
        clearCalc();
        freshClear = true;
    }
    else
    {
        switch (stack.length)
        {
            case 0: //if stack is empty - first input
            {
                firstNum();
                break;
            }

            case 1: //if stack has value x, check value
            {
                //if input is num then we concat input to x
                if (isNum(input))
                {
                    if(freshClear == true) //if recent clear (numx is not result)
                    {
                    numx = numx + input
                    stack[0] = numx;
                    }
                    else{ //numx is result so replace numx instead of add to it
                        numx = input;
                        stack[0] = numx;
                        freshClear = true;
                    }
                }
                else if (input === ".") //if . check if any other . before concat
                {
                    if(freshClear === false) //if numx is result, replace numx
                    {
                        numx = input;
                        stack[0] = numx;
                        freshClear = true;
                    }
                    else
                    {
                        let period = false;
                        for (let cur of numx)
                        {
                            if (cur == ".") {
                                period = true;
                                break;
                            };
                        }
                        if (period == false)
                        {
                        numx = numx + input;
                        stack[0] = numx;
                        }
                    }
                }
                else if (input === "%") //if % finish calculation and reset
                {
                    numx = toPercent(numx);
                    result = numx;
                    clearCalc();
                    stack.push(numx);
                }
                else if (input === "*" || input === "/" || input === "-" || input === "+")
                {
                    operator = input;
                    stack.push(input);
                }
                break;
            }
            case 2: //we have num and operator
            {
                if (isNum(input) || input == "-" || input == ".") 
                {
                    if (input == 0) //cannot divide by 0 - print msg and reset.
                    {
                        clearCalc;
                        numx = "Imagine if...";

                    }
                    numy = input;
                    stack.push(numy);
                } 
                break;
            }
            
            case 3: // we have num, operator, and num(incomplete?)
            {
                //if input is num then we concat input to y
                if (isNum(input))
                {
                    numy = numy + input
                    stack[2] = numy;
                }
                else if (input === ".") //if . check if any other . before concat
                {
                    let period = false;
                    for (let cur of numy)
                    {
                        if (cur == ".") {
                            period = true;
                            break;
                        };
                    }
                    if (period == false)
                    {
                    numy = numy + input;
                    stack[2] = numy;
                    }
                }
                else if (input === "%") //if % finish calculation and reset
                {
                    //convert y to percent and then calculate
                    numy = toPercent(numy);
                    stack[2] = numy;
                    calculate();
                    numx = result;
                    clearCalc();
                    stack.push(numx);
                }
                else if (input === "*" || input === "/" || input === "-" || input === "+")
                {
                    //call calc then start new equation with result and input
                    calculate();
                    operator = input;
                    numx = result;
                    clearCalc();
                    stack.push(numx);
                    stack.push(operator);
                }
                //should be able to do 10 + 100% = 11
                break;
            }
        }
    }
    updateScreen();
}

function firstNum()
{
    if (isNum(input) || input == "-" || input == ".") {
        numx = input;
        stack.push(numx);
    } 
}

function calculate() //we assume stack has all 3 elements
{
    freshClear = false;
    switch (operator)
    {
        case "+":{
            result = add(numx,numy);
            break;
        }
        case "-":{
            result = sub(numx,numy);
            break;
        }
        case "*":{
            result = mult(numx,numy);
            break;
        }
        case "/":{
            result = div(numx,numy);
            break;
        }
    }
    numx = "";
    numy = "";
    operator = "";
}

function updateScreen()
{
    const screen = document.getElementById("screen");

    for (const cur of stack)
    {
        screenText += cur;
    }
    console.log(screenText);
    screen.innerText=screenText;



    console.log(screenText);
    screenText = "";
}







//supporting functions
function round(x)
{
    var roundedValue = x.toFixed(3);
    return parseFloat(roundedValue);
}

function isNum(num)
{
    return !isNaN(num);
}

function toPercent(num)
{
    return num / 100;
}

function clearCalc()
{
    stack = [];
}

//supporting operating functions
function add(x,y)
{
 return round(parseFloat(x) + parseFloat(y));
}

function sub(x,y)
{
    return round(parseFloat(x) - parseFloat(y));
}

function mult(x,y)
{
    return round(parseFloat(x) * parseFloat(y));
}

function div(x,y)
{
    return round(parseFloat(x) / parseFloat(y));
}

function percent(x)
{
    return round(parsseFloat(x) / 100);
}

