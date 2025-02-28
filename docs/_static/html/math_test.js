var mathOperations=["\+" , "×"]
var operations=["plus","times"]
var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function convert_millions(num) {
if (num >= 1000000) {
    return convert_millions(Math.floor(num / 1000000)) + " million " + convert_thousands(num % 1000000);
} else {
    return convert_thousands(num);
}
}

function convert_thousands(num) {
if (num >= 1000) {
    return convert_hundreds(Math.floor(num / 1000)) + " thousand " + convert_hundreds(num % 1000);
} else {
    return convert_hundreds(num);
}
}

function convert_hundreds(num) {
if (num > 99) {
    return ones[Math.floor(num / 100)] + " hundred " + convert_tens(num % 100);
} else {
    return convert_tens(num);
}
}

function convert_tens(num) {
if (num < 10) return ones[num];
else if (num >= 10 && num < 20) return teens[num - 10];
else {
    if(num % 10==0)
        return tens[Math.floor(num / 10)] ;
    else
        return tens[Math.floor(num / 10)] + " " + ones[num % 10];
}
}

function convert(num) {
    if (num == 0) return "zero";
    else return convert_millions(num);
}
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
function GenerateNewQuestion()
{  
    document.getElementById("correctAnswerLine").className='d-none';
    document.getElementById("testResult").className='d-none';
    var operationIndex= Math.floor((Math.random() * 2) );
    var operator = Math.floor(Math.random() * 10)+1;
    var operand = Math.floor(Math.random() * 10)+1;
    document.getElementById('operatorNumber').innerText=operator.toString();
    document.getElementById('operand').innerText=operand.toString();
    document.getElementById('operation').innerText=mathOperations[operationIndex];
    var operationResult=0;
    switch(operationIndex)
    {
        case 0:
            operationResult=operator + operand;
            break;
        case 1:
            operationResult=operator * operand;
            break;
    }
    document.getElementById('operationResult').innerText=operationResult.toString();
    var correctAnswer=capitalizeFirstLetter(convert(operator))+" " + operations[operationIndex]+ " " + convert(operand)+" equals " + convert(operationResult)+".";
    document.getElementById('correctAnswer').innerText=correctAnswer;
}
function CheckAnswer()
{    
    document.getElementById("correctAnswerLine").className='d-block';
    document.getElementById("testResult").className='d-block';
 
    var correctAnswer=document.getElementById('correctAnswer').innerText;
    if(correctAnswer==document.getElementById('myAnswer').value)
    {
        document.getElementById("answerStatus").innerText="correct";
        document.getElementById("answerStatus").className="text-success";
    }
    else
    {
        document.getElementById("answerStatus").innerText="incorrect";
        document.getElementById("answerStatus").className="text-danger";
    }
}
function ReadPage()
{    
    var synth = window.speechSynthesis;
    var textToSpeech=document.getElementById("readableContent").innerText;
    var toSpeak = new SpeechSynthesisUtterance(textToSpeech);
    synth.speak(toSpeak);
}