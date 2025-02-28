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
    setTimeout(() => playByText("en-US", textToSpeech, 300));
}
let _speechSynth
let _voices
const _cache = {}
/**
 * retries until there have been voices loaded. No stopper flag included in this example. 
 * Note that this function assumes, that there are voices installed on the host system.
 */

function loadVoicesWhenAvailable (onComplete = () => {}) {
    _speechSynth = window.speechSynthesis
    const voices = _speechSynth.getVoices()
  
    if (voices.length !== 0) {
      _voices = voices
      onComplete()
    } else {
      return setTimeout(function () { loadVoicesWhenAvailable(onComplete) })
    }
  }
  
  /**
   * Returns the first found voice for a given language code.
   */
  
  function getVoices (locale) {
    if (!_speechSynth) {
      throw new Error('Browser does not support speech synthesis')
    }
    if (_cache[locale]) return _cache[locale]
  
    _cache[locale] = _voices.filter(voice => voice.lang === locale)
    return _cache[locale]
  }
  
  /**
   * Speak a certain text 
   * @param locale the locale this voice requires
   * @param text the text to speak
   * @param onEnd callback if tts is finished
   */
  
  function playByText (locale, text, onEnd) {
    const voices = getVoices(locale)
  
    // TODO load preference here, e.g. male / female etc.
    // TODO but for now we just use the first occurrence
    const utterance = new window.SpeechSynthesisUtterance()
    utterance.voice = voices[0]
    utterance.pitch = 1
    utterance.rate = 1
    utterance.voiceURI = 'native'
    utterance.volume = 1
    utterance.rate = 1
    utterance.pitch = 0.8
    utterance.text = text
    utterance.lang = locale
  
    if (onEnd) {
      utterance.onend = onEnd
    }
  
    _speechSynth.cancel() // cancel current speak, if any is running
    _speechSynth.speak(utterance)
  }