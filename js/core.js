var _VERSION = "v3.2.1";
var MIN_SKIN_ID = 1;
var MAX_SKIN_ID = 2;
var FILE_HEADER = "uu";//uu-<number>.css
var __CURSOR_STRING = "_";
var _SCORE = 0;

var SKINLINK = document.getElementById("SKINLINK");
var inputElement = document.getElementById("inputElement");
var displayElement = document.getElementById("displayElement");
var displayKey = document.getElementById("displayKey");
var keyTip = document.getElementById("keyTip");
var keydownCounter = document.getElementById("keydownCounter");
var backspaceCounter = document.getElementById("backspaceCounter");
var typingCounter = document.getElementById("typingCounter");
var progressCounter = document.getElementById("progressCounter");
var timerElement = document.getElementById("timer");
var speedDisplayer = document.getElementById("speedDisplayer");
var button_inputModeSwitch = document.getElementById("button_inputModeSwitch");
var button_taskLauncher = document.getElementById("button_taskLauncher");
var button_changeSkin = document.getElementById("button_changeSkin");

var _author_ = document.getElementById("_author_");
var _title_ = document.getElementById("_title_");


_title_.innerHTML = "UUTP " + _VERSION;
_author_.innerHTML = "By QuartzQuincy2019 (Quincy K.)";
_author_.href = "https://github.com/QuartzQuincy2019";
_author_.title = "How did you discover me?";
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

    var reg = [null, /&#\d+;/, /&\w+;/, /<\w+>/];

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
            var count = 0;
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
String.prototype.charAtTyping = function (charIndex) {
    return this.getTypingNewArray()[charIndex];
}
String.prototype.getTypinglength = function () {
    return this.getTypingNewArray().length;
}
function round(number, precision) {
    return Math.round(+number + "e" + precision) / Math.pow(10, precision);
}
function getRandomArbitrary(min, max) {//min<=x<max
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {//min<=x<max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
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
        var totalSec = this.totalTime/1000;
        var _min = Math.floor(totalSec/60);
        var _sec = Math.round(totalSec % 60);
        var isSingle = false;
        if(_sec<10){
            isSingle = true;
        }
        if(isSingle){
            timerEle.innerHTML = "Time: " + _min + ":0"+_sec;
        }else{
            timerEle.innerHTML = "Time: " + _min + ":"+_sec;
        }
        timerEle.innerHTML += " ("+ round(totalSec,1)+"s)";
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
 * @param {Element} element 要居中的元素
 */
function centralizate(element) {
    var WINDOW_WIDTH = window.innerWidth;
    var ELEMENT_WIDTH = element.offsetWidth;
    element.style.left = (WINDOW_WIDTH - ELEMENT_WIDTH) / 2 + "px";
}
setInterval(function () {
    centralizate(_author_);
    centralizate(_title_);
    centralizate(progressCounter);
    progressCounter.style.top = _title_.offsetHeight + 5+ "px";
}, 100);
setInterval(function () {
    timer.writeInTimer();
    refreshSpeedDisplay(typingCount, timer);
}, 100);