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

function refreshLoadingInfoText(article_number) {
    loadingInfo.innerHTML = "Article: " + (article_number + 1) + " / " + articles.length;
}

function refreshProgressText() {
    if (keyTipArray.length == 0) {
        return;
    }
    _CURRENT_NUMBER = getCurrentNumber();
    //console.log(_CURRENT_NUMBER);
    var len = keyTipArray.length;
    var rate = Math.round(_CURRENT_NUMBER / len * 10000) / 100;
    progressCounter.innerHTML = "Progress: " + _CURRENT_NUMBER + " / " + len + " (" + rate + "%)";
}

/**
 * 核心函数，刷新按键提示
 */
function refreshKeyTip() {
    if (keyTipArray.length == 0) {
        return;
    }
    _CURRENT_NUMBER = getCurrentNumber();//刷新现在要输入的number
    var idx = _CURRENT_NUMBER;
    setDone();
    if (!done) {
        var writeIn = "";
        var target = keyTipArray[idx];
        if (target == " ") {
            writeIn = "Space";
        } else {
            writeIn = target;
        }
        keyTip.innerHTML = "Please press KEY: " + writeIn;
    } else {
        //done
        var date = new Date();
        addTypingRecord(date);
        refreshTrl();
        keyTip.innerHTML = "Nice Job!<br>You completed your task within " + timer.totalTime / 1000 + " seconds!<br>Press " + __FK_LAUNCH_TASK + " to launch a new task!";
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
    if (LETTER_PER_MINUTE == Infinity || LETTER_PER_SECOND == NaN) {
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
    typingCounter.innerHTML = typingCount + " Ltr(s)&Sp(s)";
    backspaceCounter.innerHTML = backspaceCount + " Backspace(s)";
    keydownCounter.innerHTML = keydownCount + " Keydown(s)";
}

function refreshTelescope() {
    if (!__IS_TELESCOPE_ALWAYS_DISPLAY) {
        console.log(inputElement.isBelowViewport(false));
        if (inputElement.isBelowViewport(false)) {
            telescope.style.display = "";
        } else {
            telescope.style.display = "none";
            return;
        }
    } else {
        telescope.style.display = "";
    }
    telescope.innerHTML = "";
    var I_len = inputElement.children.length;
    if (I_len <= __MAX_TELESCOPE_CHARACTER) {
        for (var i = 0; i < inputElement.children.length; i++) {
            var writeIn;
            var thisChar = inputElement.children[i].innerHTML;
            if (thisChar == "<br>") {
                writeIn = __TELESCOPE_BREAKLINE;
            } else if (thisChar == " " || thisChar == "&nbsp;") {
                writeIn = __TELESCOPE_SPACE;
            } else {
                writeIn = thisChar;
            }
            telescope.innerHTML += "<span id=\"TELESCOPE_" + i + "\">" + writeIn + "</span>";
        }
    } else {
        for (var i = I_len - __MAX_TELESCOPE_CHARACTER; i < I_len; i++) {
            var writeIn;
            var thisChar = inputElement.children[i].innerHTML;
            if (thisChar == "<br>") {
                writeIn = __TELESCOPE_BREAKLINE;
            } else if (thisChar == " " || thisChar == "&nbsp;") {
                writeIn = __TELESCOPE_SPACE;
            } else {
                writeIn = thisChar;
            }
            telescope.innerHTML += "<span id=\"TELESCOPE_" + i + "\">" + writeIn + "</span>";
        }
    }
    if (_SANDBOX_MODE == false && keyTipArray.length != 0) {
        var T_id = 0;
        var I_id = 0;
        var T_key = "";
        var D_key = "";
        var T_len = telescope.children.length;
        //console.log("telescope.children.length = " + T_len);
        for (var j = 0; j <= T_len - 2; j++) {
            T_id = Number(telescope.children[j].id.slice(10));
            //console.log(telescope.children[j].id);
            I_id = T_id;
            //console.log("j=" + j + ", I_id=" + I_id);
            T_key = extractValue(CHARACTER, KEY, inputElement.children[I_id].innerHTML);//获取当前对应的key
            //console.log("j=" + j + ", T_key=" + T_key);
            D_key = keyTipArray[I_id];
            //console.log("j=" + j + ", D_key=" + D_key);
            if (D_key == T_key) {
                telescope.children[j].className = "TTC_correct";
            }
            if (D_key != T_key) {
                telescope.children[j].className = "TTC_incorrect";
            }
        }
    }
}

function clearTrl() {
    trl.innerHTML = "";
}

function refreshTrl() {
    var _arr = _TYPING_RECORDS;
    clearTrl();
    var _time;
    var _dateText = "";
    var _articleNum = 0;
    var _timeCost = 0;
    var _speed = 0;
    var _str = "";
    for (var i = 0; i < _arr.length; i++) {
        _time = _arr[i].completeTime;
        _dateText = "" + _time.getDate() + "/"
            + (_time.getMonth() + 1) + "/"
            + (_time.getYear() + 1900) + " "
            + _time.getHours() + ":"
            + _time.getMinutes() + ":"
            + _time.getSeconds();
        console.log(_dateText);
        _articleNum = _arr[i].chosenArticle;
        _timeCost = _arr[i].timeCost;
        _speed = _arr[i].speed;
        var id = i;
        var seq = i + 1;
        _str = "<p id=\"TRL_" + id + "\">"
            + "[<strong>" + seq + "</strong>] "
            + "[<strong>" + _dateText + "</strong>] "
            + "Atc.: <strong>" + _articleNum + "</strong>; "
            + "Time: <strong>" + _timeCost + "s</strong>; "
            + "Speed: <strong>" + _speed + " Ltr./s</strong>"
            + "</p>";
        trl.innerHTML += _str;
    }
    trl.scrollTop = trl.scrollHeight;
}

function adjustIoAreaSize(isAssignment, _SIZE) {
    if (!isAssignment) {
        for (var i = 0; i < _ioAreaPara.length; i++) {
            var cur = Number(window.getComputedStyle(_ioAreaPara[i])["font-size"].slice(0, -2));
            cur += _SIZE;
            _ioAreaPara[i].style["font-size"] = cur + "px";
        }
    } else {
        for (var i = 0; i < _ioAreaPara.length; i++) {
            _ioAreaPara[i].style["font-size"] = _SIZE + "px";
        }
    }
}

//位置固定
setInterval(function () {
    fixHorizontalPosition(_author_, 0.5);
    fixHorizontalPosition(_title_, 0.5);
    fixHorizontalPosition(progressCounter, 0.5);
    fixHorizontalPosition(timerStatusDisplayer, 0.5);
    fixHorizontalPosition(telescope, 0.5);
    telescope.style.bottom = (_author_.offsetHeight - 3) + "px";
    progressCounter.style.top = _title_.offsetHeight + 5 + "px";
    timerStatusDisplayer.style.top = _title_.offsetHeight + progressCounter.offsetHeight + 10 + "px";
    loadingInfo.style.top = SPEEDAREA.offsetHeight + 5 + "px";
    trl.style.top = SPEEDAREA.offsetHeight + loadingInfo.offsetHeight + 10 + "px";
}, 300);

setInterval(function () {
    timer.writeInTimer();
    refreshSpeedDisplay(typingCount, timer);
}, 100);

setInterval(() => {
    refreshTimerStatusText();
}, 200);

//显示进入网页的说明
var _str = "";
_str += "***This is a purely English web page. Your keyboard input has been restricted on this page and you cannot enter any characters other than English (and punctuation).";
_str += "<br>***Press <strong>" + __FK_MODE_SWITCH + "</strong> then <strong>" + __FK_LAUNCH_TASK + "</strong> to launch a new task randomly from the file \".\\js\\tasks.js\" and start your practice.";
_str += "<br>***You can add new typing tasks by modifying the file \".\\js\\tasks.js\".";
_str += "<br>***If you want to enter a line break (i.e. <strong>Enter</strong> key) in a typing task, type\"&lt;br&gt;\" into the file.";
_str += "<br>***Note: If the length of a single typing task is too long (greater than 500 letters), your browser will take more time to load it, usually LONGER than 0.6 seconds.";
_str += "<br>***You have to make sure you type <strong>## E V E R Y ##</strong> letter correctly. In this way, the program can determine that you have completed the typing task.";
_str += "<br>***The default fonts used for this page are \"" + __DEFAULT_FONT_TYPING + "\" and \"" + __DEFAULT_FONT_OTHER + "\". If you do not have a font file for these fonts on your computer, the browser will use the default font to replace the missing font.";
_str += "<br>***Press the <strong>" + __FK_TIMER_TOGGLE + "</strong> key to start/stop your inputing and the timer.";
_str += "<br>***Press the <strong>" + __FK_INCREASE_FONT_SIZE + "</strong> / <strong>" + __FK_DECREASE_FONT_SIZE + "</strong> key to increase / decrease the size of the text of input&display area; press the <strong>" + __FK_DEFAULT_FONT_SIZE + "</strong> key to set them to the default size.";
_str += "<br>***Press the <strong>" + __FK_CLEAR + "</strong> / <strong>Backspace</strong> (continuously) / <strong>" + __FK_MODE_SWITCH + "</strong> key to clear these instructions.";
inputElement.innerHTML = _str;
button_clearInputText.innerHTML = "Clear & Restart Timer [" + __FK_CLEAR + "]";
button_taskLauncher.innerHTML = "Launch New Task! [" + __FK_LAUNCH_TASK + "]";
button_restartTimer.innerHTML = "Restart Timer [" + __FK_TIMER_RESTART + "]";
button_changeSkin.innerHTML = "Change Skin [" + __FK_MOVE_SKIN + "]";
button_defaultFontSize.innerHTML = "Default Font Size [" + __FK_DEFAULT_FONT_SIZE + "]";
button_trl.innerHTML = "Typing Record List [" + __FK_TRL_SWITCH + "]";

//设置字体大小
adjustIoAreaSize(true, 30);
telescope.style["font-size"] = __DEFAULT_TELESCOPE_FONT_SIZE + "px";
//望远镜
telescope.style["width"] = (__MAX_TELESCOPE_CHARACTER / 2 + 0.6) + "em";
telescope.style["maxWidth"] = (__MAX_TELESCOPE_CHARACTER / 2 + 0.6) + "em";
//列表
trl.style["maxHeight"] = __LIST_HEIGHT + "em";
trl.style["height"] = __LIST_HEIGHT + "em";

//设置字体
TITLEAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
COUNTAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
AUTHORAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
SPEEDAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
LISTAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
LISTAREA.style["font-size"] = "18px";
for (var i = 0; i < BUTTONAREA.children.length; i++) {
    BUTTONAREA.children[i].style["font-family"] = __DEFAULT_FONT_OTHER;
}

TYPINGAREA.style["font-family"] = __DEFAULT_FONT_TYPING;
telescope.style["font-family"] = __DEFAULT_FONT_TYPING;


clearTrl();