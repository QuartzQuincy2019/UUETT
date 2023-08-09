//dv.js
//2023/8/8
//Default Variables

/**
 * 当前版本。只有贡献者对此有解释权。
 */
var _VERSION = "v5.2.0";

/**
 * 最大皮肤ID。
 */
var MAX_SKIN_ID = 2;

/**
 * CSS文件头名称。
 */
var FILE_HEADER = "uu";//uu-<number>.css

/**
 * 自定义光标。
 */
var __CURSOR_STRING = "▮";


//望远镜设置

/**
 * 若为true，则始终显示望远镜
 * 若为false，则仅当输入区域部分或全部在视口以下时，显示望远镜
 */
var __IS_TELESCOPE_ALWAYS_DISPLAY = true;

/**
 * 望远镜最多能显示的字符。不宜超过15。
 */
var __MAX_TELESCOPE_CHARACTER = 15;

/**
 * 望远镜对换行符的替代字符，不允许包含大于号和小于号及其他特殊字符。
 */
var __TELESCOPE_BREAKLINE = "↲";

/**
 * 望远镜对空格的替代字符，不允许包含大于号和小于号及其他特殊字符。
 */
var __TELESCOPE_SPACE = "•";

//默认字体大小设置，单位：px
var __DEFAULT_TELESCOPE_FONT_SIZE = 30;//望远镜默认字体大小

/**
 * 切换皮肤按钮上显示的文本
 * 当皮肤ID为n时，皮肤按钮上显示的文本为__SKIN_HINTS[n]
 */
var __SKIN_HINTS = [
    null,
    "Turn Off the Light",
    "Turn On the Light"
];

//默认字体设置
var __DEFAULT_FONT_TYPING = "Consolas";//打字区域显示字体
var __DEFAULT_FONT_OTHER = 'Times New Roman';//其他区域显示字体

//功能键设置
var __FK_LAUNCH_TASK = "Control";//刷新任务
var __FK_MODE_SWITCH = "Tab";//输入模式切换
var __FK_TIMER_RESTART = "Alt";//重新计时
var __FK_CLEAR = "F1";//清除输入
var __FK_MOVE_SKIN = "F10";//切换皮肤
var __FK_TIMER_TOGGLE = "F12";//暂停或开始计时
var __FK_DEFAULT_FONT_SIZE = "F9";//默认字号
var __FK_INCREASE_FONT_SIZE = "PageUp";//增大字号
var __FK_DECREASE_FONT_SIZE = "PageDown";//减小字号
