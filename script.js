const result = document.getElementById("result");
const display = document.getElementById("display");
let bracketValue = 0;
let onOperator = false;
let onBracket = false;
let isResult = false;
let onComma = false;
const OperatorValueArr = ["+", "-", "*", "/"];

const addValue = (button) => {
	if (isResult === true) {
		Clear();
	}
	if(display.textContent==="0"){
		display.textContent = display.textContent.slice(0, -1);
		result.textContent = result.textContent.slice(0, -1);
	}

	if (button.id === "ope") {
		if (onBracket === true) {
			return 0;
		}
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
			} 
			else {
				display.textContent += button.textContent;
				result.textContent += button.textContent;
			}
		}
		onOperator = true;
		onComma=false;
	} else {
		if(onOperator===true){
			if(button.textContent==="0"){
				return
			}
		}
		onOperator = false;
		display.textContent += button.textContent;
		result.textContent += button.textContent;
	}
	onBracket = false;
	console.log("String Length now "+ result.textContent.length + " last input: " + button.textContent)
};

const Clear = () => {
	display.textContent = "0";
	result.textContent = "0";
	onOperator = false;
	bracketValue = 0;
	onBracket = false;
	isResult = false;
	onComma = false;
	console.clear()
};

const Delete = () => {
	
	//clear after equal
	if (isResult === true) {
		Clear();
	}

	//normal delete
	else {
		//check before
		if (onBracket === true) {
			onBracket = false;
			bracketValue -= 1;
			console.log("Bracket Deleted");
		}
		//if operator detected, check if number on the left is decimal or no
		else if (onOperator === true) {
			onOperator = false;
			console.log("Operator Deleted");
			for(var i=1;i<result.textContent.length;i++){
				if(OperatorValueArr.includes(result.textContent[result.textContent.length-(i+1)])){
					console.log("loop stop")
					break;
				}
				if(result.textContent[result.textContent.length-i]==="."){
					console.log("comma detected on "+ (result.textContent.length-i+1))
					onComma=true;
				}
			}
		}

		if (result.textContent[result.textContent.length - 1] === ".") {
			onComma = false;
		}

		//delete 1 char
		console.log("String Length now "+ (result.textContent.length - 1) + " last deleted: " + result.textContent[result.textContent.length - 1])
		display.textContent = display.textContent.slice(0, -1);
		result.textContent = result.textContent.slice(0, -1);


		//check onOperator after delete
		if (OperatorValueArr.includes(result.textContent[result.textContent.length - 1])){
			onOperator = true;
			console.log("Operator detected" + result.textContent[result.textContent.length - 1]);

			
		}
		//check Bracket after delete
		if (result.textContent[result.textContent.length - 1] === "(") {
			onBracket = true;
			console.log(
				"Bracket Detected" + result.textContent[result.textContent.length - 1]
			);
		}
	}
	if(display.textContent===""){
		display.textContent="0"
		result.textContent="0"
	}
};

const Bracket = () => {
	if(display.textContent==="0"){
		display.textContent = display.textContent.slice(0, -1);
		result.textContent = result.textContent.slice(0, -1);

	}

	if (onBracket === false) {
		if (onOperator === false) {
			if (bracketValue === 0) {	
			if(result.textContent.length>=1){
				display.textContent = display.textContent + "×";
				result.textContent = result.textContent + "*";
			}
				bracketValue = bracketValue + 1;
				display.textContent = display.textContent + "(";
				result.textContent = result.textContent + "(";
				onBracket = true;
			} else {
				display.textContent = display.textContent + ")";
				result.textContent = result.textContent + ")";
				bracketValue = bracketValue - 1;
			}
		} else {
			display.textContent = display.textContent + "(";
			result.textContent = result.textContent + "(";
			bracketValue = bracketValue + 1;
			onBracket = true;
		}
	} else {
		bracketValue = bracketValue + 1;
		display.textContent = display.textContent + "(";
		result.textContent = result.textContent + "(";
	}
};

const equal = () => {
	if(result.textContent===""){
		return
	}
	result.textContent = eval(result.textContent);
	isResult = true;
	display.textContent = result.textContent;
};

const comma = () => {
	if (onComma === true) {
		return 0;
	}
	if (onOperator === true || onBracket === true) {
		onBracket = false;
		onOperator = false;
		result.textContent = result.textContent + "0";
		display.textContent = display.textContent + "0";
	}

	result.textContent = result.textContent + ".";
	display.textContent = display.textContent + ".";

	onComma = true;
};
