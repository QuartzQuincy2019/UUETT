//dv.js
//2023/8/8
//Default Variables

/**
 * 当前版本。只有贡献者对此有解释权。
 */
var _VERSION = "v7.10.0";

/**
 * ~ LANGUAGE ~
 * 界面语言 v7.5.0 -> v7.9.0
 * english : English
 * simplified chinese : 简体中文
 * traditional chinese : 繁體中文
 */
var __INTERFACE_LANGUAGE = "zh-CN";

/**
 * 自定义光标。
 */
var __CURSOR_STRING = "▮";

/**
 * 默认输入区域的字体大小，单位：px（像素）
 * v7.2.1
 */
var __DEFAULT_IO_FONT_SIZE = 40;

/**
 * 调整字体大小的幅度，不宜超过6。单位：px（像素）
 * v7.2.1
 */
var __FONT_SIZE_ADJUSTMENT_RANGE = 4;

/**
 * 在这里列举您想要进行练习的文章组名，(v7.6.0)
 * 以装载在tasks.js中您想要进行练习的文章组
 */
var __ARTICLE_GROUPS = ["名句集", "洛夫克拉夫特名句集", "travelchinaguide.com选段", "I have a dream -- Martin Luther King, Jr."];

/**
 * 您选择的__ARTICLE_GROUPS中的文章数组的序列，从0开始（包括0）
 * 若值为以下几种，则自动进入全局随机练习模式：
 * 负数, undefined, NaN, Infinity, 大于等于__ARTICLE_GROUPS长度的数
 */
var __DEFAULT_AG_NUMBER = -1;

/**
 * 最大皮肤ID。
 */
var MAX_SKIN_ID = 4;

/**
 * CSS皮肤文件头名称。
 */
var FILE_HEADER = "uu";//uu-<number>.css

/**
 * v7.8.0
 * 顾名思义，皮肤名称
 */
var __SKIN_NAMES = [
    null,
    "UU经典",
    "午夜时分",
    "水色泡泡",
    "殷红火山"
];

/**
 * 切换皮肤按钮上显示的文本
 * 当皮肤ID为n时，皮肤按钮上显示的文本为__SKIN_HINTS[n]
 */
var __SKIN_HINTS = [
    null,
    "☽",
    "B",
    "V",
    "☀"
];

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

/**
 * 望远镜字体大小，默认值为48
 */
var __DEFAULT_TELESCOPE_FONT_SIZE = 48;

//打字纪录列表(TRL)设置(v6.0.0)

/**
 * 列表的默认宽度，单位为em(字高)
 * 该值是多少，就显示几列数据，若该值过大可能会导致计算不精确，建议设为4
 */
var __LIST_HEIGHT = 4;

//列表数据的文本格式(v6.1.0)
var __LIST_TEXT_ATCG = "AtcG.";//文章组编号
var __LIST_TEXT_ATCN = "AtcN.";//文章编号
var __LIST_TEXT_ATCL = "AtcL.";//文章长度
var __LIST_TEXT_TIMEC = "Time";//花费时间
var __LIST_TEXY_SPD = "Speed";//速度
var __LIST_TEXT_U_LS = "Ltr./s";//字母每秒
var __LIST_TEXT_U_LM = "Ltr./min";//字母每分钟

//默认字体设置
var __DEFAULT_FONT_TYPING = "Consolas, '华文中宋'";//打字区域显示字体，强烈建议等宽字体
var __DEFAULT_FONT_OTHER = "'Times New Roman', '华文中宋', '宋体'";//其他区域显示字体，建议为Times New Roman或宋体

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
var __FK_BA_SWITCH = "F6";//显示/隐藏按钮区域(v7.0.0)
var __FK_TRL_SWITCH = "F7";//显示/隐藏打字记录表
var __FK_CLEAR_MODE_SWITCH = "F4";//进入纯净模式