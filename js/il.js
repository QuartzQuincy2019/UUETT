//il.js
//Instructions & Layout
//2023/8/9
//从display.js和core.js分离

_title_.innerHTML = "UUTT " + _VERSION;
_author_.innerHTML = "By QuartzQuincy2019 (Quincy K.)";
_author_.href = "https://github.com/QuartzQuincy2019";
_author_.title = "How did you discover me?";

clearTrl();

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
button_trl.innerHTML = "Typing Record List (TRL) [" + __FK_TRL_SWITCH + "]";