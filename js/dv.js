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
]