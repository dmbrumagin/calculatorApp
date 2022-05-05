 /*------------------------------VARIABLES---------------------------------*/
    const result = document.getElementById("result");
    const clear = document.getElementById("clear");
    const clearNumber = document.getElementById("clearNumber");
    const back = document.getElementById("back");
    const equals = document.getElementById("equals");
    const neg = document.getElementById("negative");
    const operators = document.querySelectorAll("#operator");
    const numbers = document.querySelectorAll("#number");
    const historyElement = document.getElementById("history");
    const historyArray = [];

    let historyStatement = "";
    let number = "";
    let answer = null;
    let operator = "";

    /*-------------------------EVENT LISTENERS--------------------------------*/   
    
    clear.addEventListener("click", clearEvent);    
    clearNumber.addEventListener("click", clearNumberEvent);    
    back.addEventListener("click", backEvent);    
    equals.addEventListener("click", displayAnswer);    
    neg.addEventListener("click",negativeNumber);    
    operators.forEach(n => n.addEventListener("click", storeOperator));    
    numbers.forEach(n => n.addEventListener("click", formNumber));

    /*-----------------------------FUNCTIONS----------------------------------*/

    function storeOperator() {        
        if (answer === null) 
            answer = Number.parseFloat(number);        
        else if (number) {
            switch (operator) {
                case "*": answer *= Number.parseFloat(number);
                    break;
                case "/": answer /= Number.parseFloat(number);
                    break;
                case "-": answer -= Number.parseFloat(number);
                    break;
                case "+": answer += Number.parseFloat(number);
                    break;
            }
        }
        operator = event.target.innerHTML;
        result.innerText = operator;
        historyStatement += `${number} ${operator}`;
        number = "";
    }

    function formNumber(event) {
        number += event.target.innerHTML;
        result.innerText = number;
    }

    function negativeNumber(){
        if(number.charAt(0)!='-')
            number = `-${number}`;
        else{
            number = number.slice(1,number.length);
        }
        result.innerText = number;
    }

    function calculate() {const result = document.getElementById("result");}

    function clearEvent() {
        answer = null;
        historyStatement = "";
        number = "";
        operator = "";
        result.innerText ="";
    }

    function clearNumberEvent() {
        number = "";
        result.innerText = number;
    }

    function updateDisplayAnswer() {result.innerText = Number.parseFloat(answer);}

    function backEvent() {
        number = number.slice(0, number.length - 1);
        result.innerText = number;
    }

    function displayAnswer() {
        switch (operator) {
            case "*": answer *= Number.parseFloat(number);
                break;
            case "/": answer /= Number.parseFloat(number);
                break;
            case "-": answer -= Number.parseFloat(number);
                break;
            case "+": answer += Number.parseFloat(number);
                break;
        }
        if(answer!= null && !Number.isNaN(answer)){
            historyStatement += ` ${number} = ${answer}`;
            historyArray.push(historyStatement);
            updateDisplayAnswer();
        }

        else{
            result.innerText = "error";
        }

        displayHistory();        
        historyStatement = "";
        number = "";
        operator = "";        
        answer = null;
    }

    function displayHistory() {
        const html = historyArray.map(n => `<li>${n}</li>`).join("");
        historyElement.innerHTML = html;
    }
