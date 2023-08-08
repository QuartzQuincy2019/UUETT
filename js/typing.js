//typing.js

var typing = document.addEventListener('keydown', function (event) {
    var key = event.key + "";//小写
    console.log("按键：" + key);
    if (key == __FK_LAUNCH_TASK) {
        event.preventDefault();
        launchTask(articles);
        return;
    }
    if (key == __FK_MODE_SWITCH) {
        event.preventDefault();
        inputModeSwitch();
        return;
    }
    if (key == __FK_TIMER_RESTART) {
        event.preventDefault();
        timer.restart();//重新计时
        return;
    }
    if (key == __FK_CLEAR) {
        event.preventDefault();
        clearInputText();
        return;
    }
    if (key == __FK_MOVE_SKIN) {
        event.preventDefault();
        moveSkin();
        return;
    }
    if (key == __FK_TIMER_TOGGLE) {
        event.preventDefault();
        timer.toggle();//暂停或开始计时
        return;
    }
    if (key == __FK_DEFAULT_FONT_SIZE) {
        event.preventDefault();
        adjustIoAreaSize(true, 30);
    }
    if (key == __FK_INCREASE_FONT_SIZE) {
        event.preventDefault();
        adjustIoAreaSize(false, 2);
    }
    if (key == __FK_DECREASE_FONT_SIZE) {
        event.preventDefault();
        adjustIoAreaSize(false, -2);
    }
    if (timer.intervalId == null && _SANDBOX_MODE == false) {
        return;
    }
    if (key != "Backspace") {
        // 检查按下的键是否在假名映射表中
        if (KEY.includes(key)) {
            if (!signs.includes(key)) {//如果按键不在signs中
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
        if (inputElement.firstChild.innerHTML == __CURSOR_STRING && inputElement.children.length == 1) {//3.2.2修复
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

var windowScroller = document.addEventListener("keydown", function (event) {
    var ret = refreshNextDisplay(false);
    if (ret == -1) {
        return -1;
    }
    var _CURRENT_TO_TOP = _NEXT_DISPLAY.offsetTop;
    var _CURRENT_TO_LEFT = _NEXT_DISPLAY.offsetLeft;
    var _INNER_WIDTH = window.innerWidth;
    var _INNER_HEIGHT = window.innerHeight;
    var targetX = _CURRENT_TO_LEFT - _INNER_WIDTH * 0.5;
    var targetY = _CURRENT_TO_TOP - _INNER_HEIGHT * 0.5;
    window.scrollTo(targetX, targetY);
})

function correct() {
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

function launchTask(articleArray) {
    var aLength = articleArray.length;
    var randomNum = getRandomInt(0, aLength);
    while (randomNum == _CHOSEN_ARTICLE_NUMBER) {
        randomNum = getRandomInt(0, aLength);
    }
    _CHOSEN_ARTICLE_NUMBER = randomNum;
    refreshLoadingInfoText(_CHOSEN_ARTICLE_NUMBER);
    var str = articleArray[randomNum];
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