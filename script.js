const result = document.getElementById("result");
const display = document.getElementById("display");
let bracketValue = 0;
let onOperator = false;
let onBracket = false;
const OperatorValueArr = ["+","-","*","/"]

const addValue = (button) => {
	if (button.id === "ope") {
		if (onOperator === true) {
			Delete();
			if (button.textContent === "×") {
				display.textContent += "×";
				result.textContent += "*";
			} else {
				display.textContent += button.textContent;
				result.textContent += button.textContent;
			}
		} else {	
			if (button.textContent === "×") {
				display.textContent += "×";
				result.textContent += "*";
			} else if (button.textContent === "÷") {
				display.textContent += "÷";
				result.textContent += "/";
			} else {
				display.textContent += button.textContent;
				result.textContent += button.textContent;
			}
		}
		onOperator = true;
	} else {
		onOperator = false;
		const buttonValue = button.textContent;
		display.textContent += buttonValue;
		result.textContent += buttonValue;
	}
	onBracket = false;
};

const Clear = () => {
	display.textContent = "";
	result.textContent = "";
	onOperator = false;
	bracketValue = 0;
	onBracket = false;
};

const Delete = () => {
	display.textContent = display.textContent.slice(0, -1);
	result.textContent = result.textContent.slice(0, -1);

	if(OperatorValueArr.includes(result.textContent[result.textContent.length - 1])){
		onOperator=true
		console.log("Operator detected"+result.textContent[result.textContent.length-1])
	}
	else{
		onOperator=false
		console.log("Number detected"+result.textContent[result.textContent.length-1])
		
	}

};

const Bracket = () => {
	if (onBracket === false) {
		if (onOperator === false) {
			if (bracketValue === 0) {
				bracketValue = bracketValue + 1;
				display.textContent = display.textContent += "(";
				result.textContent = result.textContent += "(";
				onBracket=true;
			} else {
				display.textContent = display.textContent += ")";
				result.textContent = result.textContent += ")";
				bracketValue = bracketValue - 1;
			}
		} else {
			display.textContent = display.textContent += "(";
			result.textContent = result.textContent += "(";
			bracketValue = bracketValue + 1;
			onBracket=true;
		}
	} 
	else {
		bracketValue = bracketValue + 1;
				display.textContent = display.textContent += "(";
				result.textContent = result.textContent += "(";
	}
};

const equal = () => {
	result.textContent = eval(result.textContent);
	display.textContent = result.textContent;
	onOperator = false;
};