//core.js
var MIN_SKIN_ID = 1;//最小皮肤ID，不允许修改

var _SANDBOX_MODE = true;//页面刷新时的默认输入模式
var _CLEAR_MODE = false;
var _IS_TRL_OPEN = true;
var _IS_BA_OPEN = true;
var done = false;//不允许修改

var keydownCount = 0;//按键次数（包括Shift）
var backspaceCount = 0;//退格次数
var typingCount = 0;//打字次数
var _CURRENT_NUMBER = 0;
var _TASK_STRING_LENGTH = 0;

var keyTipArray = [];
var pressedKeyArray = [];
var _TYPING_RECORDS = [];
var _CHOSEN_ARTICLE = [0, 0];

var _NEXT_DISPLAY;//element

//element variables
var SKINLINK = document.getElementById("SKINLINK");

var inputElement = document.getElementById("inputElement");
var displayElement = document.getElementById("displayElement");
var telescope = document.getElementById("telescope");
var trl = document.getElementById("typingRecordList");

var displayKey = document.getElementById("displayKey");
var keyTip = document.getElementById("keyTip");
var keydownCounter = document.getElementById("keydownCounter");
var backspaceCounter = document.getElementById("backspaceCounter");
var typingCounter = document.getElementById("typingCounter");
var progressCounter = document.getElementById("progressCounter");

var loadingInfo = document.getElementById("loadingInfo");
var timerElement = document.getElementById("timer");
var timerStatusDisplayer = document.getElementById("timerStatusDisplayer");
var speedDisplayer = document.getElementById("speedDisplayer");
var fontSizeDisplayer = document.getElementById("fontSizeDisplayer");

var button_inputModeSwitch = document.getElementById("button_inputModeSwitch");
var button_clearInputText = document.getElementById("button_clearInputText");
var button_taskLauncher = document.getElementById("button_taskLauncher");
var button_restartTimer = document.getElementById("button_restartTimer");
var button_changeSkin = document.getElementById("button_changeSkin");
var button_defaultFontSize = document.getElementById("button_defaultFontSize");
var button_trl = document.getElementById("button_trl");

var menu = document.getElementById("menu");
var footer = document.getElementById("footer");

var KEYTIPAREA = document.getElementById("KEYTIPAREA");
var SPEEDAREA = document.getElementById("SPEEDAREA");
var TITLEAREA = document.getElementById("TITLEAREA");
var COUNTAREA = document.getElementById("COUNTAREA");
var BUTTONAREA = document.getElementById("BUTTONAREA");
var AUTHORAREA = document.getElementById("AUTHORAREA");
var TYPINGAREA = document.getElementById("TYPINGAREA");
var TELESCOPEAREA = document.getElementById("TELESCOPEAREA");
var LISTAREA = document.getElementById("LISTAREA");
var _ioAreaPara = document.getElementsByClassName("ioAreaPara");

var _author_ = document.getElementById("_author_");
var _title_ = document.getElementById("_title_");

//errors
var ERRORS = {
    1200: {
        ErrorStatus: false,
        ErrorMessage: "ERROR 1200: \"__ARTICLE_GROUPS\" IS EMPTY"
    },
    1201: {
        ErrorStatus: false,
        ErrorMessage: "ERROR 1201: NOT ALL ELEMENTS IN \"__ARTICLE_GROUPS\" ARE ARRAYS"
    },
    1202: {
        ErrorStatus: false,
        ErrorMessage: "ERROR 1202: NOT ALL ELEMENTS IN EVERY ARTICLE GROUP ARE STRINGS"
    }
}

if (__ARTICLE_GROUPS.length == 0) ERRORS[1200].ErrorStatus = true;
if (isArrayAll(__ARTICLE_GROUPS, "array") == false) ERRORS[1201].ErrorStatus = true;
if (__ARTICLE_GROUPS.every(function (subArr) {
    return isArrayAll(subArr, "string");
}) == false) ERRORS[1202].ErrorStatus = true;
/**
 * 
 * @param {Array} _arr 
 * @param {String} _type 
 * @returns 
 */
function isArrayAll(_arr, _type) {
    if (!Array.isArray(_arr)) {
        return false;
    }
    if (_type === "array") {
        return _arr.every(function (element) {
            return Array.isArray(element)
        })
    }
    return _arr.every(function (element) {
        return typeof element === _type;
    })
}

/**
 * 
 * @param {Number} start 
 * @param {Number} obj 
 * @returns 
 */
Array.prototype.allEqualsTo = function (start, obj) {
    var count = 0;
    for (var i = start; i < this.length; i++) {
        if (this[i] == obj) {
            count += 1;
        }
    }
    if (count == this.length - start) {
        return true;
    } else {
        return false;
    }
}
Array.prototype.allGreaterThan = function (start, num) {
    var count = 0;
    for (var i = start; i < this.length; i++) {
        if (this[i] > num) {
            count += 1;
        }
    }
    if (count == this.length - start) {
        return true;
    } else {
        return false;
    }
}
String.prototype.getTypingNewArray = function () {
    var newArray = [];
    var restString = this;
    for (var i = 0; i < restString.length; i++) {
        if (INCORRECT_SET.includes(restString.charAt(i))) {
            var value = extractValue(INCORRECT_SET, CORRECT_SET, restString.charAt(i));
            console.log(value);
            restString = replaceCharAndShift(restString, i, value);
            continue;
        }
    }

    var reg = [null, /&#\d+;/, /&\w+;/, /<br>/];

    var reg_startIdx = [null];
    for (var i = 1; i < reg.length; i++) {
        reg_startIdx.push(-100);
    }
    var reg_endIdx = [null];
    for (var i = 1; i < reg.length; i++) {
        reg_endIdx.push(-100);
    }
    var reg_switch = [null];
    for (var i = 1; i < reg.length; i++) {
        reg_switch.push(false);
    }
    var matches = [null];
    for (var i = 1; i < reg.length; i++) {
        reg_switch.push(null);
    }

    while (restString.length > 0) {
        var START = 0;
        var END = 0;
        for (var j = 1; j < reg.length; j++) {
            matches[j] = reg[j].exec(restString);
            if (matches[j]) {
                reg_startIdx[j] = matches[j].index;
                reg_endIdx[j] = reg_startIdx[j] + matches[j][0].length - 1;
            } else {
                reg_startIdx[j] = -1;
                reg_endIdx[j] = -1;
            }
        }
        if ((!reg_startIdx.includes(0))) {
            newArray.push(restString[0]);//录入
            restString = restString.slice(1);//删除
        } else {
            /*console.log("reg_startIdx: " + reg_startIdx+"\nreg_endIdx: " + reg_endIdx);*/
            //包括0
            var __MODE = -1;//判断到了表达式的序号
            //寻找第几项不是0
            for (var j = 1; j < reg_startIdx.length; j++) {
                if (reg_startIdx[j] == 0) {
                    __MODE = j;
                }
            }
            //项已确认，开始处理
            START = reg_startIdx[__MODE];
            END = reg_endIdx[__MODE];
            var result = restString.slice(START, END + 1);
            newArray.push(result);
            restString = restString.slice(END + 1);
        }
    }
    return newArray;
}

/**
 * 
 * @param {boolean} isCompletelyBelow 控制是否完全在视口下方
 * @returns
 */
Element.prototype.isBelowViewport = function (isCompletelyBelow) {
    var rect = this.getBoundingClientRect();
    var bottom = rect.bottom;
    if (isCompletelyBelow) {
        return bottom - window.innerHeight > rect.height;
    } else {
        return (bottom - window.innerHeight > 0 && bottom - window.innerHeight < rect.height);
    }
}
/**
 * 
 * @param {boolean} isCompletelyOver 控制是否完全在视口上方
 * @returns 
 */
Element.prototype.isOverViewport = function (isCompletelyOver) {
    var rect = this.getBoundingClientRect();
    var top = rect.top;
    if (isCompletelyOver) {
        return top - rect.bottom == rect.height;
    } else {
        return (top + rect.bottom == rect.height && top > 0)
    }
}

function replaceCharAndShift(str, i, replacement) {
    var charArray = str.split('');
    var shiftAmount = replacement.length - 1;

    // 替换字符
    charArray[i] = replacement[0];

    // 向后移动字符
    for (var j = charArray.length - 1; j > i; j--) {
        charArray[j + shiftAmount] = charArray[j];
    }

    // 插入替换的字符
    for (var k = 1; k < replacement.length; k++) {
        charArray[i + k] = replacement[k];
    }

    var modifiedStr = charArray.join('');
    return modifiedStr;
}

/**
 * 
 * @param {Array} elements 
 * @param {String} value 
 */
function setElementsStyle(elements, attribute, value) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style[attribute] = value;
    }
}

/**
 * 
 * @param {ELement} elementId
 * @param {Boolean} isWidth
 */
function getOneEm(elementId, isWidth) {
    var element = document.getElementById(elementId);
    var tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.whiteSpace = "nowrap";
    tempElement.style.margin = "0";
    tempElement.style.padding = "0";
    tempElement.innerHTML = "A";
    tempElement.style.fontFamily = element.style.fontFamily;
    tempElement.style.fontSize = element.style.fontSize;
    document.body.appendChild(tempElement);
    var emToPx = 0;
    if (isWidth) {
        emToPx = tempElement.offsetWidth;
    } else {
        emToPx = tempElement.offsetHeight;
    }
    document.body.removeChild(tempElement);
    var emValueInPx = emToPx;
    return emValueInPx;
}

function getSpeed(isPerSecond) {
    var speed = 0;
    var sec = timer.totalTime / 1000;
    speed = typingCount / sec;
    if (!isPerSecond) {
        speed = (speed * 60).toFixed();
        return speed;
    }
    return speed.toFixed(2);
}

/**
 * TypingRecord类
 */
class TypingRecord {
    /**
     * 
     * @param {Date} completeTime 完成任务的时间
     * @param {Number} chosenArticle 选择的文章序号
     * @param {Number} timeCost 花费时间（秒）
     * @param {Number} speed 打字速度（字母每秒）
     */
    constructor(completeTime) {
        this.completeTime = completeTime;
        this.articleGroup = _CHOSEN_ARTICLE[0];
        this.articleNumber = _CHOSEN_ARTICLE[1];
        this.articleLength = _TASK_STRING_LENGTH;
        this.timeCost = timer.totalTime / 1000;
        this.speedPerSec = getSpeed((true));
        this.speedPerMin = getSpeed((false));
    }
}

function addTypingRecord(completeTime) {
    var tr = new TypingRecord(completeTime)
    _TYPING_RECORDS.push(tr);
}

function round(number, precision) {
    return Math.round(+number + "e" + precision) / Math.pow(10, precision);
}

/**
 * 获取一个min<=x<max的随机数
 * @param {Number} min 
 * @param {Number} max 
 * @returns 随机数
 */
function getRandomArbitrary(min, max) {//min<=x<max
    return Math.random() * (max - min) + min;
}

/**
 * 获取一个min<=x<max的随机整数
 * @param {Number} min 
 * @param {Number} max 
 * @returns 随机整数
 */
function getRandomInt(min, max) {//min<=x<max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

/**
 * 获取一个min<=x<=max的随机整数
 * @param {Number} min 
 * @param {Number} max 
 * @returns 随机整数
 */
function getRandomIntInclusive(min, max) {//min<=x<=max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

var timer = {
    count: 0,
    _interval: 100,
    totalTime: 0,//time in milliseconds
    intervalId: null,

    // 开始计时
    start: function () {
        this.intervalId = setInterval(() => {
            this.count += 1;
            this.totalTime = this.count * this._interval;
        }, this._interval);
    },

    // 停止计时
    stop: function () {
        clearInterval(this.intervalId);
        this.intervalId = null;
    },

    // 重置计时
    reset: function () {
        this.count = 0;
        this.totalTime = 0;
    },

    toggle: function () {
        if (this.intervalId) {
            timer.stop();
        } else {
            timer.start();
        }
    },

    restart: function () {
        typingCount = 0;
        backspaceCount = 0;
        keydownCount = 0;
        if (this.intervalId) {
            timer.stop();
            timer.reset();
        }
        timer.reset();
        timer.start();
    },

    writeInTimer: function () {
        var timerEle = timerElement;
        var totalSec = this.totalTime / 1000;
        var _min = Math.floor(totalSec / 60);
        var _sec = Math.round(totalSec % 60);
        var isSingle = false;
        if (_sec < 10) {
            isSingle = true;
        }
        if (isSingle) {
            timerEle.innerHTML = "Time: " + _min + ":0" + _sec;
        } else {
            timerEle.innerHTML = "Time: " + _min + ":" + _sec;
        }
        timerEle.innerHTML += " (" + round(totalSec, 1) + "s)";
    }
};

/**
 * 
 * @param {Array} array1 
 * @param {Array} array2 
 * @param {Object} key1 
 * @param {Object} key2 
 */
function isInArrayMap(array1, array2, key1, key2) {
    if (array1.includes(key1) && array2.includes(key2)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 返回valueArray中对应的值
 * @param {Array} keyArray 
 * @param {Array} valueArray 
 * @param {Object} keyArrayValue 
 */
function extractValue(keyArray, valueArray, keyArrayValue) {
    var indexInValueArray = keyArray.indexOf(keyArrayValue);
    return valueArray[indexInValueArray];
}

/**
 * 
 * @param {Element} element 要固定位置的元素
 * @param {Number} rate 比率
 */
function fixHorizontalPosition(element, rate) {
    var WINDOW_WIDTH = window.innerWidth;
    var ELEMENT_WIDTH = element.offsetWidth;
    var left = WINDOW_WIDTH * rate - ELEMENT_WIDTH / 2;
    element.style.left = Math.floor(left) + "px";
}

function clearInputText() {
    inputElement.innerHTML = "";
    pressedKeyArray = [];
    appendCharacter(__CURSOR_STRING);
    timer.restart();
    window.scrollTo(0, 0);
    refreshTelescope();
}

function inputModeText() {
    if (_SANDBOX_MODE == true) {
        button_inputModeSwitch.innerHTML = "to Task Mode [" + __FK_MODE_SWITCH + "]";
    } else {
        button_inputModeSwitch.innerHTML = "to Sandbox Mode [" + __FK_MODE_SWITCH + "]";
    }
}

/**
 * 
 * @param {Boolean} _clearArticleNumber 
 * @param {Boolean} _clearCount 
 * @param {Boolean} _clearKeyTip 
 * @param {Boolean} _resetDone 
 */
function clearModeCache(
    _clearArticleData,
    _clearCount,
    _clearKeyTip,
    _resetDone) {
    areaDisplay();
    if (_clearArticleData) {
        _CHOSEN_ARTICLE = [0, 0];
    }
    if (_clearCount) {
        typingCount = 0;
        backspaceCount = 0;
        keydownCount = 0;
    }
    if (_clearKeyTip) {
        keyTipArray = [];
    }
    if (_resetDone) {
        done = false;
    }
    inputModeText();
    _TASK_STRING_LENGTH = 0;
    displayElement.innerHTML = "You are in <strong>Task Mode</strong> but have <strong>not</strong> launched a task yet.<br>Press <strong>" + __FK_LAUNCH_TASK + "</strong> to launch a new task!<br>Typing is meaningless now.";
    clearInputText();
    refreshLoadingInfoText();
    refreshProgressText();
    refreshKeyTip();
}

function inputModeSwitch() {
    if (timer.intervalId) {
        timer.restart();
    }
    if (_SANDBOX_MODE == true) {
        _SANDBOX_MODE = false;
    } else {
        _SANDBOX_MODE = true;
    }
    clearModeCache(true, true, true, true);
}

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

/**
 * done判定与刷新函数
 */
function setDone() {
    if (keyTipArray.length != 0) {
        if (_CURRENT_NUMBER == keyTipArray.length) {
            done = true;
        } else {
            done = false;
        }
    } else {
        done = false;
    }
}

function getCurrentNumber() {
    if (_SANDBOX_MODE == true) {
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

function refreshMode() {
    //当页面被加载时调用
    if (_SANDBOX_MODE == false) {
        clearModeCache(true, true, true, true);
    }
}

/**
 * 
 * @param {Number} toolVariable 全局工具变量
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Boolean} isInclusive 是否包括最大值 
 * @returns {Number} 随机整数
 */
function noRepeatRandom(toolVariable, min, max, isInclusive) {
    if (min == max) {
        return min;
    }
    var lastValue = toolVariable;
    var random = undefined;
    do {
        if (isInclusive) {
            random = getRandomIntInclusive(min, max);
        } else {
            random = getRandomInt(min, max);
        }
    } while (random == lastValue);
    return random;
}

function setTrlDisplay() {
    if (_IS_TRL_OPEN == true) {
        trl.style.display = "";
    } else {
        trl.style.display = "none";
    }
}

function switchTrl() {
    if (!_IS_TRL_OPEN) {
        _IS_TRL_OPEN = true;
    } else {
        _IS_TRL_OPEN = false;
    }
    setTrlDisplay();
}

function switchBa() {
    if (!_IS_BA_OPEN) {
        _IS_BA_OPEN = true;
    } else {
        _IS_BA_OPEN = false;
    }
    setBaDisplay();
}

function setBaDisplay() {
    if (_IS_BA_OPEN == true) {
        BUTTONAREA.style.display = "";
    } else {
        BUTTONAREA.style.display = "none";
    }
}

function switchClearMode() {//Clear Mode
    if (!_CLEAR_MODE) {
        _CLEAR_MODE = true;
    } else {
        _CLEAR_MODE = false;
    }
    setClearModeDisplay();
}

function setClearModeDisplay() {
    var areas = [KEYTIPAREA, AUTHORAREA,
        TITLEAREA, COUNTAREA, BUTTONAREA];
    if (_CLEAR_MODE == true) {
        for(var i = 0; i<areas.length;i++){
            areas[i].style.visibility = "hidden";
        }
    } else {
        for(var i = 0; i<areas.length;i++){
            areas[i].style.visibility = "visible";
        }
    }
}

function isArticleGroupRandom() {
    if (__DEFAULT_AG_NUMBER == undefined || __DEFAULT_AG_NUMBER == Infinity
        || __DEFAULT_AG_NUMBER < 0 || __DEFAULT_AG_NUMBER == NaN
        || __DEFAULT_AG_NUMBER % 1 != 0 || __DEFAULT_AG_NUMBER >= __ARTICLE_GROUPS.length) {
        return true;
    } else {
        return false;
    }
}