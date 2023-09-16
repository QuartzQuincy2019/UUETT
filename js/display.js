//display.js

var _txt_SANDBOX_MODE, _txt_NO_TASK_INFO;
_txt_SANDBOX_MODE = lang[__langcode]["_sandbox_Mode"];
_txt_NO_TASK_INFO = lang[__langcode]["_no_Task_Info"];
var p = "<p>";
var _p = "</p>";
var strong = "<strong>";
var _strong = "</strong>";

function areaDisplay() {
    if (_SANDBOX_MODE == true) {
        displayElement.style.display = "none";
    } else {
        displayElement.style.display = "";
    }
}

/**
 * 
 * @param {Element} element 
 * @param {Number} errorNumber 
 */
function throwErrorMessage(element, errorNumber) {
    element.innerHTML = "<p><strong>" + ERRORS[errorNumber].ErrorMessage + "</strong></p>";
    throw new Error(ERRORS[errorNumber].ErrorMessage);
}

/**
 * 
 * @param {Element} element 
 * @param {Array} errorNumberArray 
 */
function determineError(element, errorNumberArray) {
    for (var i = 0; i < errorNumberArray.length; i++) {
        if (ERRORS[errorNumberArray[i]].ErrorStatus) {
            throwErrorMessage(element, errorNumberArray[i]);
        }
    }
}

function refreshTimerStatusText() {
    if (timer.intervalId) {
        timerStatusDisplayer.innerHTML = p + lang[__langcode]["_timer_Running"] + _p;
    }
    else {
        timerStatusDisplayer.innerHTML = p + lang[__langcode]["_timer_Stopped"] + _p;
    }
}

function refreshFontSizeDisplay() {//7.2.1
    var fs = window.getComputedStyle(inputElement).fontSize;
    var _def_str, _min_str, _str;
    _def_str = lang[__langcode]["_fontSize_Default"];
    _min_str = lang[__langcode]["_fontSize_Minimum"];
    _str = lang[__langcode]["_fontSize_Display"] + strong + fs + strong;
    var isDefault = false;
    var isMinimum = false
    if (fs == __DEFAULT_IO_FONT_SIZE + "px") {
        isDefault = true;
    }
    if (fs == "12px") {
        isMinimum = true;
    }
    if (isDefault) {
        _str += "&nbsp;&nbsp;" + _def_str;
    }
    if (isMinimum) {
        _str += "&nbsp;&nbsp;" + _min_str;
    }
    fontSizeDisplayer.innerHTML = _str;
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

function refreshSkinNameText() {
    var id = getCurrentSkinId();
    var sn = __SKIN_NAMES[id];
    var _str = p;
    _str += lang[__langcode]["_current_Skin"];
    skinNameDisplayer.innerHTML = _str + strong + sn + _strong + _p;
}

function refreshLoadingInfoText() {
    if (_SANDBOX_MODE == true) {
        loadingInfo.innerHTML = p + strong + _txt_SANDBOX_MODE + _strong + _p;
        return;
    }
    if (_SANDBOX_MODE == false && ERRORS[1200].ErrorStatus) {
        throwErrorMessage(loadingInfo, 1200);
        return;
    }
    determineError(loadingInfo, _determineErrorArray);
    if (_SANDBOX_MODE == false && keyTipArray.length == 0) {
        loadingInfo.innerHTML = p + strong + _txt_NO_TASK_INFO + _strong + _p;
        return;
    }
    var str = "";
    if (isArticleGroupRandom()) {
        str += p + strong + lang[__langcode]["_random_Article_Group"] + _strong + "<br>";
    } else {
        str += p;
    }
    var chosenGroupName = _CHOSEN_ARTICLE_GROUPS[_CHOSEN_ARTICLE[0]]["articleGroupName"];

    str +=
        lang[__langcode]["_selected_Article_Group"]
        + strong + (_CHOSEN_ARTICLE[0] + 1) + _strong
        + " / "
        + strong + (__ARTICLE_GROUPS.length) + _strong
        + "&nbsp;&nbsp;&nbsp;("
        + strong + chosenGroupName + _strong
        + ")<br>"
        + lang[__langcode]["_selected_Article"]
        + strong + (_CHOSEN_ARTICLE[1] + 1) + _strong
        + " / "
        + strong + (_CHOSEN_ARTICLE_GROUPS[_CHOSEN_ARTICLE[0]]["articlesArray"].length) + _strong;
    str += _p;
    loadingInfo.innerHTML = str;
}

function refreshProgressText() {
    var cm_str = "";
    if (_CLEAR_MODE) {
        cm_str = lang[__langcode]["_clear_Mode"];
    }
    if (_SANDBOX_MODE == true) {
        progressCounter.innerHTML = p + cm_str + strong + _txt_SANDBOX_MODE + _strong + lang[__langcode]["_typing_Progress_Invalid"] + _p;
        return;
    }
    if (_SANDBOX_MODE == false && ERRORS[1200].ErrorStatus) {
        throwErrorMessage(progressCounter, 1200);
        return;
    }
    determineError(progressCounter, _determineErrorArray);
    if (keyTipArray.length == 0) {
        progressCounter.innerHTML = p + cm_str + strong + _txt_NO_TASK_INFO + _strong + lang[__langcode]["_typing_Progress_Invalid"] + _p;
        return;
    }
    _CURRENT_NUMBER = getCurrentNumber();
    //console.log(_CURRENT_NUMBER);
    var len = keyTipArray.length;
    var rate = Math.round(_CURRENT_NUMBER / len * 10000) / 100;
    progressCounter.innerHTML =
        p + cm_str
        + lang[__langcode]["_typing_Progress"]
        + strong + _CURRENT_NUMBER + _strong
        + " / "
        + strong + len + _strong +
        " ("
        + strong + " " + rate + "%" + _strong + ")"
        + _p;
}

/**
 * 核心函数，刷新按键提示
 */
function refreshKeyTip() {
    if (_SANDBOX_MODE == true) {
        keyTip.innerHTML =
            p + strong
            + _txt_SANDBOX_MODE
            + _strong
            + lang[__langcode]["_keyTip_Invalid"]
            + _p;
        return;
    }
    if (_SANDBOX_MODE == false && ERRORS[1200].ErrorStatus) {
        throwErrorMessage(keyTip, 1200);
        return;
    }
    determineError(progressCounter, _determineErrorArray);
    if (keyTipArray.length == 0) {
        keyTip.innerHTML =
            p + strong
            + _txt_NO_TASK_INFO
            + _strong
            + lang[__langcode]["_keyTip_Empty"]
            + _p;
        return;
    }
    _CURRENT_NUMBER = getCurrentNumber();//刷新现在要输入的number
    var idx = _CURRENT_NUMBER;
    setDone();
    if (!done) {
        var writeIn = "";
        var target = keyTipArray[idx];
        if (target == " ") {
            writeIn = lang[__langcode]["_space_Key"];
        } else {
            writeIn = target;
        }
        if (target == "Enter") {
            writeIn = lang[__langcode]["_enter_Key"];
        } else {
            writeIn = target;
        }
        keyTip.innerHTML =
            p
            + lang[__langcode]["_please_Press_Key"]
            + strong + writeIn + _strong
            + _p;
    } else {
        //done
        var date = new Date();
        addTypingRecord(date);
        refreshTrl();
        keyTip.innerHTML = p
            + lang[__langcode]["_keyTip_Done_1"]
            + strong + "<em>" + (timer.totalTime / 1000) + "</em>"
            + _strong
            + lang[__langcode]["_keyTip_Done_2"]
            + _p;
        timer.stop();
    }
}

function refreshSpeedDisplay(typingCount, _timer) {
    var speedDisplay = speedDisplayer;
    var LETTER_PER_SECOND = typingCount / (_timer.totalTime / 1000);
    LETTER_PER_SECOND = LETTER_PER_SECOND.toFixed(2);
    var LETTER_PER_MINUTE = LETTER_PER_SECOND * 60;
    LETTER_PER_MINUTE = LETTER_PER_MINUTE.toFixed(0);

    speedDisplay.innerHTML =
        LETTER_PER_SECOND + lang[__langcode]["_letters_Per_Second"]
        + "<br>"
        + LETTER_PER_MINUTE + lang[__langcode]["_letters_Per_Minute"];
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
    typingCounter.innerHTML = typingCount + lang[__langcode]["_counter_Typed"];
    backspaceCounter.innerHTML = backspaceCount + lang[__langcode]["_counter_Backspace"];
    keydownCounter.innerHTML = keydownCount + lang[__langcode]["_counter_Keydown"];

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
    var _articleGro = 0;
    var _articleNum = 0;
    var _articleLen = 0;
    var _timeCost = 0;
    var _speedPerSec = 0;
    var _speedPerMin = 0;
    var _str = "";
    var strong = "<strong>";
    var _strong = "</strong>";
    var l = "[";
    var r = "]";
    var nbsp = " ";
    var _ag_str = "";
    var _an_str = "";
    var _al_str = "";
    var _tc_str = "";
    var _sp_str = "";
    var _hr_str = "";
    var _min_str = "";
    var _sec_str = "";
    for (var i = 0; i < _arr.length; i++) {
        _time = _arr[i].completeTime;
        if (_time.getHours() < 10) {
            _hr_str = "0" + _time.getHours();
        } else {
            _hr_str = _time.getHours();
        }
        if (_time.getMinutes() < 10) {
            _min_str = "0" + _time.getMinutes();
        } else {
            _min_str = _time.getMinutes();
        }
        if (_time.getSeconds() < 10) {
            _sec_str = "0" + _time.getSeconds();
        } else {
            _sec_str = _time.getSeconds();
        }
        _dateText = "" + _time.getDate() + "/"
            + (_time.getMonth() + 1) + "/"
            + (_time.getYear() + 1900) + " "
            + _hr_str + ":"
            + _min_str + ":"
            + _sec_str;
        _articleGro = _arr[i].articleGroup;
        _articleNum = _arr[i].articleNumber;
        _articleLen = _arr[i].articleLength;
        _timeCost = _arr[i].timeCost;
        _speedPerSec = _arr[i].speedPerSec;
        _speedPerMin = _arr[i].speedPerMin;
        var id = i;
        var seq = i + 1;
        _ag_str = __LIST_TEXT_ATCG + ": " + strong + _articleGro + _strong + "; ";
        _an_str = __LIST_TEXT_ATCN + ": " + strong + _articleNum + _strong + "; ";
        _al_str = __LIST_TEXT_ATCL + ": " + strong + _articleLen + _strong + "; ";
        _tc_str = __LIST_TEXT_TIMEC + ": " + strong + _timeCost + "s" + _strong + "; ";
        _sp_str = __LIST_TEXY_SPD + ": "
            + strong + _speedPerSec + _strong + nbsp + __LIST_TEXT_U_LS + "; "
            + strong + _speedPerMin + _strong + nbsp + __LIST_TEXT_U_LM;
        _str = "<p id=\"TRL_" + id + "\">"
            + l + strong + seq + _strong + r + nbsp
            + l + strong + _dateText + _strong + r + nbsp
            + _ag_str
            + _an_str
            + _al_str
            + _tc_str
            + _sp_str
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
    refreshFontSizeDisplay();
}