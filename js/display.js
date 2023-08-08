//display.js
function areaDisplay() {
    if (_SANDBOX_MODE == true) {
        keyTip.style.display = "none";
        displayElement.style.display = "none";
        progressCounter.style.display = "none";
    } else {
        keyTip.style.display = "";
        displayElement.style.display = "";
        progressCounter.style.display = "";
    }
}

setInterval(function () {
    fixHorizontalPosition(_author_, 0.5);
    fixHorizontalPosition(_title_, 0.5);
    fixHorizontalPosition(progressCounter, 0.5);
    fixHorizontalPosition(timerStatusDisplayer, 0.5);
    progressCounter.style.top = _title_.offsetHeight + 5 + "px";
    timerStatusDisplayer.style.top = _title_.offsetHeight + progressCounter.offsetHeight + 10 + "px";
}, 100);

setInterval(function () {
    timer.writeInTimer();
    refreshTimerStatusText();
    refreshSpeedDisplay(typingCount, timer);
}, 100);

function refreshTimerStatusText() {
    if (timer.intervalId) {
        timerStatusDisplayer.innerHTML = "Timer is running";
    } else {
        timerStatusDisplayer.innerHTML = "Timer stopped";
    }
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

function refreshDisplayKeyMap(key, chara) {
    displayKey.textContent = "[" + key + "] key is [" + chara + "]";
}

function refreshProgressText() {
    _CURRENT_NUMBER = getCurrentNumber();
    var len = keyTipArray.length;
    var rate = Math.round(_CURRENT_NUMBER / len * 10000) / 100;
    progressCounter.innerHTML = "Progress: " + _CURRENT_NUMBER + " / " + len + " (" + rate + "%)";
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
        keyTip.innerHTML = "Nice Job!<br>You completed your task within " + timer.totalTime / 1000 + " seconds!<br>Press Control key to launch a new task!";
        timer.stop();
    }
}

function refreshSpeedDisplay(typingCount, _timer) {
    var speedDisplay = speedDisplayer;
    var LETTER_PER_SECOND = typingCount / (_timer.totalTime / 1000);
    LETTER_PER_SECOND = LETTER_PER_SECOND.toFixed(2);
    var LETTER_PER_MINUTE = LETTER_PER_SECOND * 60;
    LETTER_PER_MINUTE = LETTER_PER_MINUTE.toFixed(0);
    speedDisplay.innerHTML = LETTER_PER_SECOND + "   letters/s<br>" + LETTER_PER_MINUTE + "   letters/min";
    if (LETTER_PER_MINUTE == Infinity) {
        speedDisplay.style.display = "none";
    } else {
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

function refreshKeyCounterText() {
    typingCounter.innerHTML = typingCount + " letter(s) & space(s) typed";
    backspaceCounter.innerHTML = backspaceCount + " Backspace(s)";
    keydownCounter.innerHTML = keydownCount + " Keydown(s)";
}