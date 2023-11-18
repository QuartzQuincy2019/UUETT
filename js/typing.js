//typing.js


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

var typing = document.addEventListener('keydown', function (event) {
    var key = event.key + "";//小写
    console.log("按键：" + key);
    if (key == __FK_LAUNCH_TASK) {
        event.preventDefault();
        launchTask(__ARTICLE_GROUPS);
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
        refreshTimerStatusText();
        return;
    }
    if (key == __FK_DEFAULT_FONT_SIZE) {
        event.preventDefault();
        adjustIoAreaSize(true, __DEFAULT_IO_FONT_SIZE);
    }
    if (key == __FK_INCREASE_FONT_SIZE) {
        event.preventDefault();
        adjustIoAreaSize(false, __FONT_SIZE_ADJUSTMENT_RANGE);
    }
    if (key == __FK_DECREASE_FONT_SIZE) {
        event.preventDefault();
        adjustIoAreaSize(false, -__FONT_SIZE_ADJUSTMENT_RANGE);
    }
    if (key == __FK_TRL_SWITCH) {
        event.preventDefault();
        switchTrl();
    }
    if (key == __FK_BA_SWITCH) {
        event.preventDefault();
        switchBa();
    }
    if (key == __FK_CLEAR_MODE_SWITCH) {
        event.preventDefault();
        switchClearMode();
    }
    if (timer.intervalId == null/*未计时*/ && _SANDBOX_MODE == false/*非沙盒模式*/) {
        return;
    }
    if (key != "Backspace") {
        // 检查按下的键是否在映射表中
        if (KEY.includes(key)) {
            if (!signs.includes(key)) {//如果按键不在signs中
                typingCount++;
            }
            event.preventDefault(); //阻止默认按键行为
            _displayBg.animate([
                { boxShadow: "0px 0px 20px #ffffffd0", offset: 0 },
                { boxShadow: "0px 0px 15px #ffffff80", offset: 1 }],
                {
                    duration: 500
                });//v7.13.4
            var character = extractValue(KEY, CHARACTER, key);
            deleteCharacter(1);
            appendCharacter(character);
            appendCharacter(__CURSOR_STRING);
            pressedKeyArray.push(key);
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
    }
    keydownCount += 1;
    refreshKeyTip();
    refreshKeyCounterText();
    refreshProgressText();
    refreshTelescope();
    correct();
});

var windowScroller = document.addEventListener("keydown", function () {
    if (_SANDBOX_MODE == false) {
        if (keyTipArray.length == 0) {
            return -1;
        }
        var ret = refreshNextDisplay(false);
        if (ret == -1) {
            return -1;
        }
        var rect = _NEXT_DISPLAY.getBoundingClientRect();//v7.2.0
        var _HEIGHT = rect.height;
        var _WIDTH = rect.width;
        var _CURRENT_TO_TOP = _NEXT_DISPLAY.offsetTop + menu.offsetHeight;
        var _CURRENT_TO_LEFT = _NEXT_DISPLAY.offsetLeft;
        var _INNER_WIDTH = window.innerWidth;
        var _INNER_HEIGHT = window.innerHeight;
        var targetX = _CURRENT_TO_LEFT - (_INNER_WIDTH - _WIDTH) / 2;
        var targetY = _CURRENT_TO_TOP - (_INNER_HEIGHT - _HEIGHT) / 2;
        window.scrollTo(targetX, targetY);
    } else {
        var I_len = inputElement.children.length;
        if (I_len == 1 && inputElement.children[0].innerHTML == __CURSOR_STRING) {
            return -1;
        }
        if (pressedKeyArray.length == 0) {
            return -1;
        }
        var idx = pressedKeyArray.length - 1;
        var _cur = inputElement.children[idx + 1];//跟随光标，而不是跟随光标前的字符 v7.4.0
        var rect = _cur.getBoundingClientRect();
        var _HEIGHT = rect.height;
        var _WIDTH = rect.width;
        var _CURRENT_TO_TOP = _cur.offsetTop + menu.offsetHeight;
        var _CURRENT_TO_LEFT = _cur.offsetLeft;
        var _INNER_WIDTH = window.innerWidth;
        var _INNER_HEIGHT = window.innerHeight;
        var targetX = _CURRENT_TO_LEFT - (_INNER_WIDTH - _WIDTH) / 2;
        var targetY = _CURRENT_TO_TOP - (_INNER_HEIGHT - _HEIGHT) / 2;
        window.scrollTo(targetX, targetY);
    }
});

/**
 * @returns {Array}
 */
function articleChoose() {
    if (isArticleGroupRandom() == true) {
        _CHOSEN_ARTICLE[0] = getRandomIntInclusive(0, __ARTICLE_GROUPS.length - 1);
    } else {
        _CHOSEN_ARTICLE[0] = __DEFAULT_AG_NUMBER;
    }
    //_CHOSEN_ARTICLE[0]（文章组）决定完毕
    var articles = _CHOSEN_ARTICLE_GROUPS[_CHOSEN_ARTICLE[0]];//articles为ArticleGroup类型
    //抽取开始
    var randomNum = 0;
    var aLength = articles["articlesArray"].length;
    randomNum = noRepeatRandom(_CHOSEN_ARTICLE[1], 0, aLength - 1, true);
    _CHOSEN_ARTICLE[1] = randomNum;
    return _CHOSEN_ARTICLE;
}

function launchTask() {
    if (_SANDBOX_MODE == true) {
        return;
    }
    var _arr = articleChoose();//即_CHOSEN_ARTICLE
    var str = _CHOSEN_ARTICLE_GROUPS[_arr[0]]["articlesArray"][_arr[1]];//选中的字符串
    clearModeCache(false, true, true, true);
    displayElement.innerHTML = "";//请勿忘记
    var _TASK_STRING = str.getTypingNewArray();//事先准备好新数组，减少运算次数
    _TASK_STRING_LENGTH = _TASK_STRING.length;//事先准备好数组长度，减少运算次数
    var each, calculatedKey;
    for (var i = 0; i < _TASK_STRING_LENGTH; i++) {
        each = _TASK_STRING[i];//直接访问新数组，而不是重新运算，解决了卡顿问题
        calculatedKey = extractValue(CHARACTER, KEY, each);
        if (isInArrayMap(CHARACTER, KEY, each, calculatedKey)) {
            displayElement.innerHTML += "<span id=\"TYPING_TASK_CHARACTER_" + i + "\" class=\"TTC_none\">" + each + "</span>";
            keyTipArray.push(calculatedKey);
        }
    }
    //console.log(keyTipArray)
    pressedKeyArray = [];
    refreshKeyTip();
    refreshLoadingInfoText();
    refreshProgressText();
    clearInputText();
    timer.restart();//必须为restart，否则按Shift会导致计时器加速，原因未知
}