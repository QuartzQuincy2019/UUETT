//database.js
//2023/8/2
//2023/8/5
//2023/8/6

var _SANDBOX_MODE = true;
var keydownCount = 0;
var backspaceCount = 0;
var typingCount = 0;
var keyTipArray = [];
var pressedKeyArray = [];
var done = false;
var _NEXT_DISPLAY;
var _CURRENT_NUMBER;
var _TASK_STRING_LENGTH;

var _CORRECT_COLOR = [null, "green", "#87ff41"];
var _INCORRECT_COLOR = [null, "red", "#ff3434"];

var KEY = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"",
    "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
    "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?",
    " ", "Enter"
];
var CHARACTER = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "~", "!", "@", "#", "$", "%", "^", "&#38;", "*", "(", ")", "_", "+",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "&#39;",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "&#34;",
    "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
    "Z", "X", "C", "V", "B", "N", "M", "&#60;", "&#62;", "?",
    "&#160;", "<br>"
];

var signs = ["Enter", "Space", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
    "-", "_", "=", "+", "[", "]", "{", "}", ":", ";", "\"", "\'", "\\", "|", "<", ">",
    ".", ",", "/", "Shift", "CapsLock"];

//单向转换：SPECIAL_LIST_CHARACTER -> SPECIAL_LIST_KEY
var SPECIAL_LIST_KEY = [
    "&", "'", "\"", "<", ">", " "
]
var SPECIAL_LIST_CHARACTER = [
    "&", "'", "\"", "<", ">", " "
]

function clearInputText() {
    //console.log("已清除。当前内容：" + inputElement.innerHTML);
    inputElement.innerHTML = "";
    appendCharacter(__CURSOR_STRING);
    typingCount = 0;
    backspaceCount = 0;
    keydownCount = 0;
    timer.restart();
    pressedKeyArray = [];
    window.scrollTo(0, 0);
}
function areaDisplay() {
    if (_SANDBOX_MODE == true) {
        keyTip.style.display = "none";
        displayElement.style.display = "none";
    } else {
        keyTip.style.display = "";
        displayElement.style.display = "";
    }
}
function inputModeText() {
    if (_SANDBOX_MODE == true) {
        button_inputModeSwitch.innerHTML = "Switch out of Sandbox Mode [Tab]";
    } else {
        button_inputModeSwitch.innerHTML = "Switch to Sandbox Mode [Tab]";
    }
}
function inputModeSwitch() {
    if (timer.intervalId) {
        timer.stop();
        timer.reset();
    }
    if (_SANDBOX_MODE == true) {
        _SANDBOX_MODE = false;
    } else {
        _SANDBOX_MODE = true;
        keyTipArray = [];
    }
    inputModeText();
    areaDisplay();
    clearInputText();
}

function refreshKeyCounterText() {
    typingCounter.innerHTML = typingCount + " letter(s) & space(s) typed";
    backspaceCounter.innerHTML = backspaceCount + " Backspace(s)";
    keydownCounter.innerHTML = keydownCount + " Keydown(s)";
}

function refreshSpeedDisplay(typingCount, _timer) {
    var speedDisplay = speedDisplayer;
    var LETTER_PER_SECOND = typingCount / (_timer.totalTime / 1000);
    LETTER_PER_SECOND = LETTER_PER_SECOND.toFixed(2);
    var LETTER_PER_MINUTE = LETTER_PER_SECOND * 60;
    LETTER_PER_MINUTE = LETTER_PER_MINUTE.toFixed(0);
    speedDisplay.innerHTML = LETTER_PER_SECOND + "   letters/s<br>" + LETTER_PER_MINUTE + "   letters/min";
    if(LETTER_PER_MINUTE == Infinity){
        speedDisplay.style.display = "none";
    }else{
        speedDisplay.style.display = "";
    }
    if (LETTER_PER_MINUTE <= 60) {
        speedDisplay.style.color = "#ff0000";
    } else if (LETTER_PER_MINUTE > 60 && LETTER_PER_MINUTE < 120) {
        speedDisplay.style.color = "#e43d00";
    } else if (LETTER_PER_MINUTE > 120 && LETTER_PER_MINUTE < 180) {
        speedDisplay.style.color = "#e48d00";
    } else if (LETTER_PER_MINUTE > 180 && LETTER_PER_MINUTE < 240) {
        speedDisplay.style.color = "#e4d100";
    } else if (LETTER_PER_MINUTE > 240 && LETTER_PER_MINUTE < 300) {
        speedDisplay.style.color = "#cde400";
    } else if (LETTER_PER_MINUTE > 300 && LETTER_PER_MINUTE < 360) {
        speedDisplay.style.color = "#a7e400";
    } else if (LETTER_PER_MINUTE > 360 && LETTER_PER_MINUTE < 420) {
        speedDisplay.style.color = "#1f9312";
    } else if (LETTER_PER_MINUTE > 420 && LETTER_PER_MINUTE < 480) {
        speedDisplay.style.color = "#0facae";
    } else if (LETTER_PER_MINUTE > 480) {
        speedDisplay.style.color = "#411bcb";
    }
}

function getCurrentNumber() {
    if(_SANDBOX_MODE == true){
        return NaN;
    }
    var tip = keyTipArray;
    var press = pressedKeyArray;
    if (press.length == 0) {
        return 0;
    }
    if (tip.length == 0) {
        throw new Error("keyTipArray的长度不允许为0！");
    }
    var wrong = 0;
    for (var idx = 0; idx < tip.length; idx++) {
        if (tip[idx] != press[idx]) {
            wrong = idx;
            return wrong;
        }
        if (idx == tip.length - 1) {
            return tip.length;
        }
    }
}

function refreshProgressText() {
    _CURRENT_NUMBER = getCurrentNumber();
    var len = keyTipArray.length;
    var rate = Math.round(_CURRENT_NUMBER/len*10000)/100;
    progressCounter.innerHTML = "Progress: " + _CURRENT_NUMBER + " / " + len + " ("+rate+"%)";
}

function setDone(){
    if(_CURRENT_NUMBER == keyTipArray.length){
        done = true;
    }else{
        done = false;
    }
}

/**
 * 核心函数，刷新按键提示
 */
function refreshKeyTip() {
    _CURRENT_NUMBER = getCurrentNumber();//刷新现在要输入的number
    var idx = _CURRENT_NUMBER;
    setDone();
    if (!done) {
        keyTip.innerHTML = "Please press KEY: " + keyTipArray[idx];
    } else {
        keyTip.innerHTML = "Nice Job!<br>You completed your task within "+ timer.totalTime/1000 +" seconds!<br>Press Control key to launch a new task!";
        timer.stop();
    }
}

var typing = document.addEventListener('keydown', function (event) {
    var key = event.key + "";//小写
    console.log("按键：" + key);
    if (key == "Control") {
        event.preventDefault();
        launchTask(articles);
        return;
    }
    if (key == "Tab") {
        event.preventDefault();
        inputModeSwitch();
        return;
    }
    if (key == "Alt") {
        event.preventDefault();
        timer.restart();
        return;
    }
    if (key == "F1") {
        event.preventDefault();
        clearInputText();
        return;
    }
    if (key == "F10") {
        event.preventDefault();
        moveSkin();
        return;
    }
    if (key == "F12") {
        event.preventDefault();
        timer.toggle();
        return;
    }
    if(timer.intervalId==null && _SANDBOX_MODE==false){
        return;
    }
    if (key != "Backspace") {
        // 检查按下的键是否在假名映射表中
        if (KEY.includes(key)) {
            if (!signs.includes(key)) {
                typingCount++;
            }
            event.preventDefault(); // 阻止默认的按键行为（例如输入字符到输入框）
            var character = extractValue(KEY, CHARACTER, key);
            deleteCharacter(1);
            appendCharacter(character);
            appendCharacter(__CURSOR_STRING);
            pressedKeyArray.push(key);
            refreshKeyTip();
        }
    } else if (key == "Backspace") {
        backspaceCount += 1;
        //console.log(inputElement.firstChild.innerHTML);
        if (inputElement.firstChild.innerHTML == __CURSOR_STRING) {
            deleteCharacter(1);
            appendCharacter(__CURSOR_STRING);
        } else {
            deleteCharacter(2);
            appendCharacter(__CURSOR_STRING);
        }
        pressedKeyArray.pop();
        refreshKeyTip();
    }
    keydownCount += 1;
    refreshKeyCounterText();
    refreshProgressText();
});


function deleteCharacter(count) {
    var i = 1;
    while (i <= count) {
        //console.log(inputElement.lastChild);
        inputElement.removeChild(inputElement.lastChild);
        i++;
    }
}
function appendCharacter(str) {
    inputElement.innerHTML += "<span>" + str + "</span>";
}

function refreshDisplayKeyMap(key, chara) {
    displayKey.textContent = "[" + key + "] key is [" + chara + "]";
}

function launchTask(articleArray) {
    var aLength = articleArray.length;
    var str = articleArray[getRandomInt(0,aLength)];
    if (_SANDBOX_MODE == true) {
        inputModeSwitch();
    }
    clearInputText();
    done = false;
    keydownCount = 0;
    displayElement.innerHTML = "";
    keyTipArray = [];
    var _TASK_STRING = str.getTypingNewArray();//事先准备好新数组，减少运算次数
    _TASK_STRING_LENGTH = _TASK_STRING.length;//事先准备好数组长度，减少运算次数
    var each;
    var calculatedKey;
    for (var i = 0; i < _TASK_STRING_LENGTH; i++) {
        each = _TASK_STRING[i];//直接访问新数组，而不是重新运算，解决了卡顿问题
        calculatedKey = extractValue(CHARACTER, KEY, each);
        if (isInArrayMap(CHARACTER, KEY, each, calculatedKey)) {
            displayElement.innerHTML += "<span id=\"TYPING_TASK_CHARACTER_" + i + "\" class=\"TTC_none\">" + each + "</span>";
            keyTipArray.push(calculatedKey);
        } else {
            var specKey = extractValue(SPECIAL_LIST_CHARACTER, SPECIAL_LIST_KEY, each);
            displayElement.innerHTML += "<span id=\"TYPING_TASK_CHARACTER_" + i + "\" class=\"TTC_none\">" + extractValue(KEY, CHARACTER, specKey) + "</span>";
            keyTipArray.push(specKey);
        }
    }
    //console.log(keyTipArray)
    pressedKeyArray = [];
    refreshKeyTip();
    refreshProgressText();
    timer.restart();//必须为restart，否则按Shift会导致计时器加速，原因未知
}

/**
 * 
 * @param {Boolean} isCurrentDisplay 是否是这一个
 * @returns -1:失败 0:成功
 */
function refreshNextDisplay(isCurrentDisplay) {
    //刷新_NEXT_DISPLAY的元素
    //_NEXT_DISPLAY定义：当前输入的顶端
    if (!inputElement) {
        return -1;
    }
    if (inputElement.children.length <= 1/*仅光标或加载前 */ || inputElement.children.length - 1/*减1是光标*/ > displayElement.children.length) {
        return -1;
    }
    var currentNumber = inputElement.children.length - 1;
    _CURRENT_NUMBER = currentNumber - 1;
    if (isCurrentDisplay) {
        currentNumber -= 1;
    }
    if (currentNumber >= displayElement.children.length) {
        return -1;
    }
    //console.log(currentNumber);
    _NEXT_DISPLAY = document.getElementById("TYPING_TASK_CHARACTER_" + currentNumber + "");
    //console.log(_NEXT_DISPLAY);
    return 0;
}

var windowScroller = document.addEventListener("keydown", function (event) {
    var ret = refreshNextDisplay(false);
    if (ret == -1) {
        return -1;
    }
    var _CURRENT_TO_TOP = _NEXT_DISPLAY.offsetTop;
    var _CURRENT_TO_LEFT = _NEXT_DISPLAY.offsetLeft;
    var _INNER_WIDTH = window.innerWidth;
    var _INNER_HEIGHT = window.innerHeight;
    window.scrollTo({
        left:_CURRENT_TO_LEFT - _INNER_WIDTH * 0.5,
        top:_CURRENT_TO_TOP - _INNER_HEIGHT * 0.5,
        behavior:"smooth"
    });
})


function correct() {
    var id = getCurrentSkinId();
    var inputLen = inputElement.children.length - 1;
    var current = inputLen - 1;//光标前的索引
    if (displayElement.innerHTML == "") {
        return;
    }
    for (var i = 0; i < displayElement.children.length; i++) {
        if (i <= current) {
            //console.log(displayElement.children[i].innerHTML + " " + inputed.charAtTyping(i));
            if (displayElement.children[i].innerHTML == inputElement.children[i].innerHTML) {
                displayElement.children[i].className = "TTC_correct";
            } else {
                displayElement.children[i].className = "TTC_incorrect";
            }
        } else {
            displayElement.children[i].className = "TTC_none";
        }
    }
}
var _interval_correction = setInterval(correct, 100);