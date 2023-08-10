//il.js
//Instructions & Layout
//2023/8/9
//从display.js和core.js分离

_title_.innerHTML = "UUTT " + _VERSION;
_author_.innerHTML = "By QuartzQuincy2019 (Quincy K.)";
_author_.href = "https://github.com/QuartzQuincy2019";
_author_.title = "How did you discover me?";

clearTrl();
refreshLoadingInfoText();
refreshProgressText();
refreshKeyTip();

//位置固定
trl.style.left = "5px";
BUTTONAREA.style.right = "5px";
setInterval(function () {
    TYPINGAREA.style.top = menu.offsetHeight + 5 + "px";
    trl.style.bottom = footer.offsetHeight + 5 + "px";
    BUTTONAREA.style.bottom = footer.offsetHeight + 5 + "px";
}, 100);

setInterval(function () {
    timer.writeInTimer();
    refreshSpeedDisplay(typingCount, timer);
}, 100);

setInterval(() => {
    refreshTimerStatusText();
}, 200);




//设置字体大小
adjustIoAreaSize(true, __DEFAULT_IO_FONT_SIZE);

//望远镜弹性宽度显示功能 v7.0.0
telescope.style["font-size"] = __DEFAULT_TELESCOPE_FONT_SIZE + "px";
var telescopeFlexibleWidthAdjuster = setInterval(function () {
    var _mtc = __MAX_TELESCOPE_CHARACTER;
    var _em = getOneEm("telescope", true);//通过字体大小获取一个em的宽度
    //初始设置完毕
    var W = window.innerWidth;//px
    //var _w = TELESCOPEAREA.offsetWidth;//px
    var w = (_mtc + 1.6) * _em;//px，默认情况下的望远镜宽度
    var pct = (w / W) * 100;//默认百分比
    //console.log("默认宽度w=" + w + ", 实际宽度_w" + _w + ", 窗口总宽W=" + W + ", 默认比窗口pct=" + pct + "%");
    TELESCOPEAREA.style["flex-basis"] = pct + "%";
    KEYTIPAREA.style["flex-basis"] = (100 - pct) / 2 + "%";
    AUTHORAREA.style["flex-basis"] = (100 - pct) / 2 + "%";
}, 100);

//列表 v7.0.1
var trlStyle = window.getComputedStyle(trl);
var trl_em = getOneEm("typingRecordList", false);
var trl_innerHeight = (__LIST_HEIGHT + 1) * trl_em;//px
trl.style["maxHeight"] = parseFloat(trlStyle.paddingTop) + parseFloat(trlStyle.paddingBottom) + trl_innerHeight + "px";
trl.style["height"] = trl.style["maxHeight"];

//设置字体
TITLEAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
COUNTAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
AUTHORAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
SPEEDAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
LISTAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
KEYTIPAREA.style["font-family"] = __DEFAULT_FONT_OTHER;
progressCounter.style["font-family"] = __DEFAULT_FONT_OTHER;
//LISTAREA.style["font-size"] = "18px";
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
button_taskLauncher.innerHTML = "Launch New Task! (TaskMode) [" + __FK_LAUNCH_TASK + "]";
button_restartTimer.innerHTML = "Restart Timer [" + __FK_TIMER_RESTART + "]";
button_changeSkin.innerHTML = "Change Skin [" + __FK_MOVE_SKIN + "]";
button_defaultFontSize.innerHTML = "Default Font Size [" + __FK_DEFAULT_FONT_SIZE + "]";
button_trl.innerHTML = "Typing Record List (TRL) [" + __FK_TRL_SWITCH + "]";