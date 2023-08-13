//display.js

var _txt_SANDBOX_MODE, _txt_NO_TASK_INFO;
if (__LANGUAGE == "english") {
    _txt_SANDBOX_MODE = "SANDBOX MODE";
    _txt_NO_TASK_INFO = "NO TASK INFO";
}
if (__LANGUAGE == "simplified chinese") {
    _txt_SANDBOX_MODE = "沙盒模式";
    _txt_NO_TASK_INFO = "无任务";
}

function areaDisplay() {
    if (_SANDBOX_MODE == true) {
        displayElement.style.display = "none";
    } else {
        displayElement.style.display = "";
    }
}

function refreshTimerStatusText() {
    if (timer.intervalId) {
        if (__LANGUAGE == "english") {
            timerStatusDisplayer.innerHTML = "<p>Timer is <strong>running</strong></p>";
        }
        if (__LANGUAGE == "simplified chinese") {
            timerStatusDisplayer.innerHTML = "<p>计时器<strong>运行中</strong></p>";
        }
    } else {
        if (__LANGUAGE == "english") {
            timerStatusDisplayer.innerHTML = "<p>Timer <strong>stopped</strong></p>";
        }
        if (__LANGUAGE == "simplified chinese") {
            timerStatusDisplayer.innerHTML = "<p>计时器<strong>已停止</strong></p>";
        }
    }
}

function refreshFontSizeDisplay() {//7.2.1
    var fs = window.getComputedStyle(inputElement).fontSize;
    var _def_str, _min_str, _str;
    if (__LANGUAGE == "english") {
        _def_str = "<strong>(Default)</strong>";
        _min_str = "<strong>(Minimum)</strong>";
        _str = "IO Area Font Size: <strong>" + fs + "</strong>";
    }
    if (__LANGUAGE == "simplified chinese") {
        _def_str = "<strong>(默认值)</strong>";
        _min_str = "<strong>(最小值)</strong>";
        _str = "当前打字区域字体大小：<strong>" + fs + "</strong>";
    }
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

function refreshLoadingInfoText() {
    if (_SANDBOX_MODE == true) {
        loadingInfo.innerHTML = "<p><strong>" + _txt_SANDBOX_MODE + "</strong></p>";
        return;
    }
    if (_SANDBOX_MODE == false && ERRORS[1200].ErrorStatus) {
        loadingInfo.innerHTML = "<p><strong>" + ERRORS[1200].ErrorMessage + "</strong></p>";
        return;
    }
    if (ERRORS[1201].ErrorStatus) {
        loadingInfo.innerHTML = "<p><strong>" + ERRORS[1201].ErrorMessage + "</strong></p>";
        return;
    }
    if (ERRORS[1202].ErrorStatus) {
        loadingInfo.innerHTML = "<p><strong>" + ERRORS[1202].ErrorMessage + "</strong></p>";
        return;
    }
    if (_SANDBOX_MODE == false && keyTipArray.length == 0) {
        loadingInfo.innerHTML = "<p><strong>" + _txt_NO_TASK_INFO + "</strong></p>";
        return;
    }
    var str = "";
    if (isArticleGroupRandom()) {
        if (__LANGUAGE == "english") {
            str += "<p><strong>**Random Article Group**</strong><br>";
        }
        if (__LANGUAGE == "simplified chinese") {
            str += "<p><strong>**随机文章组模式**</strong><br>";
        }
    }
    if (__LANGUAGE == "english") {
        str +=
            "Selected Article Group: <strong>" + (_CHOSEN_ARTICLE[0] + 1)
            + "</strong> / <strong>" + (__ARTICLE_GROUPS.length)
            + "</strong><br>" +
            "Selected Article: <strong>" + (_CHOSEN_ARTICLE[1] + 1) +
            "</strong> / <strong>" + (__ARTICLE_GROUPS[_CHOSEN_ARTICLE[0]].length)
            + "</strong>";
    }
    if (__LANGUAGE == "simplified chinese") {
        str +=
            "选中文章组：<strong>" + (_CHOSEN_ARTICLE[0] + 1)
            + "</strong> / <strong>" + (__ARTICLE_GROUPS.length)
            + "</strong><br>" +
            "选中文章号：<strong>" + (_CHOSEN_ARTICLE[1] + 1) +
            "</strong> / <strong>" + (__ARTICLE_GROUPS[_CHOSEN_ARTICLE[0]].length)
            + "</strong>";
    }
    str += "</p>";
    loadingInfo.innerHTML = str;
}

function refreshProgressText() {
    var cm_str = "";
    if (_CLEAR_MODE) {
        if (__LANGUAGE == "english") {
            cm_str = "(Clear Mode) ";
        }
        if (__LANGUAGE == "simplified chinese") {
            cm_str = "(清净模式) ";
        }
    }
    if (_SANDBOX_MODE == true) {
        if (__LANGUAGE == "english") {
            progressCounter.innerHTML = "<p>" + cm_str + "<strong>" + _txt_SANDBOX_MODE + "</strong>: Progress is invalid</p>";
        }
        if (__LANGUAGE == "simplified chinese") {
            progressCounter.innerHTML = "<p>" + cm_str + "<strong>" + _txt_SANDBOX_MODE + "</strong>：打字进度不可用</p>";
        }
        return;
    }
    if (_SANDBOX_MODE == false && ERRORS[1200].ErrorStatus) {
        progressCounter.innerHTML = "<p><strong>" + ERRORS[1200].ErrorMessage + "</strong></p>";
        return;
    }
    if (ERRORS[1201].ErrorStatus) {
        progressCounter.innerHTML = "<p><strong>" + ERRORS[1201].ErrorMessage + "</strong></p>";
        return;
    }
    if (ERRORS[1202].ErrorStatus) {
        progressCounter.innerHTML = "<p><strong>" + ERRORS[1202].ErrorMessage + "</strong></p>";
        return;
    }
    if (keyTipArray.length == 0) {
        if (__LANGUAGE == "english") {
            progressCounter.innerHTML = "<p><strong>" + _txt_NO_TASK_INFO + "</strong>: Progress is invalid</p>";
        }
        if (__LANGUAGE == "simplified chinese") {
            progressCounter.innerHTML = "<p><strong>" + _txt_NO_TASK_INFO + "</strong>：打字进度不可用</p>";
        }
        return;
    }
    _CURRENT_NUMBER = getCurrentNumber();
    //console.log(_CURRENT_NUMBER);
    var len = keyTipArray.length;
    var rate = Math.round(_CURRENT_NUMBER / len * 10000) / 100;
    if (__LANGUAGE == "english") {
        progressCounter.innerHTML = "<p>" + cm_str + "Progress: <strong>" + _CURRENT_NUMBER + "</strong> / <strong>" + len + "</strong> (<strong>" + rate + "%</strong>)</p>";
    }
    if (__LANGUAGE == "simplified chinese") {
        progressCounter.innerHTML = "<p>" + cm_str + "进度：<strong>" + _CURRENT_NUMBER + "</strong> / <strong>" + len + "</strong> (<strong>" + rate + "%</strong>)</p>";
    }
}

/**
 * 核心函数，刷新按键提示
 */
function refreshKeyTip() {
    if (_SANDBOX_MODE == true) {
        if (__LANGUAGE == "english") {
            keyTip.innerHTML = "<p><strong>" + _txt_SANDBOX_MODE + "</strong>: Key Tip is invalid</p>";
        }
        if (__LANGUAGE == "simplified chinese") {
            keyTip.innerHTML = "<p><strong>" + _txt_SANDBOX_MODE + "</strong>：按键提示不可用</p>";
        }
        return;
    }
    if (_SANDBOX_MODE == false && ERRORS[1200].ErrorStatus) {
        if (__LANGUAGE == "english") {
            keyTip.innerHTML = "<p><strong>" + ERRORS[1200].ErrorMessage + "</strong>: There is no tasks to load! Modify file \"dv.js\" to load an article group!</p>";
        }
        if (__LANGUAGE == "simplified chinese") {
            keyTip.innerHTML = "<p><strong>" + ERRORS[1200].ErrorMessage + "</strong>：没有能够加载的可用文章组！修改文件 \"dv.js\" 来加载一个文章组！</p>";
        }
        return;
    }
    if (ERRORS[1201].ErrorStatus) {
        keyTip.innerHTML = "<p><strong>" + ERRORS[1201].ErrorMessage + "</strong></p>";
        return;
    }
    if (ERRORS[1202].ErrorStatus) {
        keyTip.innerHTML = "<p><strong>" + ERRORS[1202].ErrorMessage + "</strong></p>";
        return;
    }
    if (keyTipArray.length == 0) {
        if (__LANGUAGE == "english") {
            keyTip.innerHTML = "<p><strong>" + _txt_NO_TASK_INFO + "</strong>: KeyTip is empty</p>";
        }
        if (__LANGUAGE == "simplified chinese") {
            keyTip.innerHTML = "<p><strong>" + _txt_NO_TASK_INFO + "</strong>：按键提示为空</p>";
        }
        return;
    }
    _CURRENT_NUMBER = getCurrentNumber();//刷新现在要输入的number
    var idx = _CURRENT_NUMBER;
    setDone();
    var p = "<p>";
    var _p = "</p>";
    if (!done) {
        var writeIn = "";
        var target = keyTipArray[idx];
        if (target == " ") {
            if (__LANGUAGE == "english") {
                writeIn = "Space";
            }
            if (__LANGUAGE == "simplified chinese") {
                writeIn = "空格键";
            }
        } else {
            writeIn = target;
        }
        if (__LANGUAGE == "english") {
            keyTip.innerHTML = p + "Please press KEY:&nbsp;&nbsp;&nbsp;<strong>" + writeIn + "</strong>" + _p;
        }
        if (__LANGUAGE == "simplified chinese") {
            keyTip.innerHTML = p + "请按键：&nbsp;<strong>" + writeIn + "</strong>" + _p;
        }
    } else {
        //done
        var date = new Date();
        addTypingRecord(date);
        refreshTrl();
        if (__LANGUAGE == "english") {
            keyTip.innerHTML = p + "Nice Job!<br>You completed your task within <strong><em>" + timer.totalTime / 1000 + "</em></strong> seconds!<br>Press <strong>" + __FK_LAUNCH_TASK + "</strong> to launch a new task!" + _p;
        }
        if (__LANGUAGE == "simplified chinese") {
            keyTip.innerHTML = p + "干得漂亮！<br>你用了<strong><em>" + timer.totalTime / 1000 + "</em></strong>秒的时间完成了这段文本！<br>按 <strong>" + __FK_LAUNCH_TASK + "</strong> 键以启动新任务！" + _p;
        }
        timer.stop();
    }
}

function refreshSpeedDisplay(typingCount, _timer) {
    var speedDisplay = speedDisplayer;
    var LETTER_PER_SECOND = typingCount / (_timer.totalTime / 1000);
    LETTER_PER_SECOND = LETTER_PER_SECOND.toFixed(2);
    var LETTER_PER_MINUTE = LETTER_PER_SECOND * 60;
    LETTER_PER_MINUTE = LETTER_PER_MINUTE.toFixed(0);
    if (__LANGUAGE == "english") {
        speedDisplay.innerHTML = LETTER_PER_SECOND + "   letters/s<br>" + LETTER_PER_MINUTE + "   letters/min";
    }
    if (__LANGUAGE == "simplified chinese") {
        speedDisplay.innerHTML = LETTER_PER_SECOND + "   字母/秒<br>" + LETTER_PER_MINUTE + "   字母/分钟";
    }
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
    if (__LANGUAGE == "english") {
        typingCounter.innerHTML = typingCount + " Ltr(s)&Sp(s)";
        backspaceCounter.innerHTML = backspaceCount + " Backspace(s)";
        keydownCounter.innerHTML = keydownCount + " Keydown(s)";
    }
    if (__LANGUAGE == "simplified chinese") {
        typingCounter.innerHTML = typingCount + " 次字母与空格";
        backspaceCounter.innerHTML = backspaceCount + " 次退格";
        keydownCounter.innerHTML = keydownCount + " 次按键";
    }
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
}