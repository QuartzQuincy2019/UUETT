//dv.js
//2023/8/8
//Default Variables

/**
 * 当前版本。只有贡献者对此有解释权。
 */
var _VERSION = "v4.0.0";

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

/**
 * 切换皮肤按钮上显示的文本
 * 当皮肤ID为n时，皮肤按钮上显示的文本为__SKIN_HINTS[n]
 */
var __SKIN_HINTS = [
    null,
    "Turn Off the Light",
    "Turn On the Light"
];

var __DEFAULT_FONT_TYPING = "Consolas";
var __DEFAULT_FONT_OTHER = 'Times New Roman';

//功能键设置
var __FK_LAUNCH_TASK = "Control";
var __FK_MODE_SWITCH = "Tab";
var __FK_TIMER_RESTART = "Alt";
var __FK_CLEAR = "F1";
var __FK_MOVE_SKIN = "F10";
var __FK_TIMER_TOGGLE = "F12";
var __FK_DEFAULT_FONT_SIZE = "F9";
var __FK_INCREASE_FONT_SIZE = "PageUp";
var __FK_DECREASE_FONT_SIZE = "PageDown";
