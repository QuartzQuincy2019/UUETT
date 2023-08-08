var skinId = [null];
var skinPath = [null];

for (var i = MIN_SKIN_ID; i <= MAX_SKIN_ID; i++) {
    skinId.push(i);
}

for (var i = MIN_SKIN_ID; i <= MAX_SKIN_ID; i++) {
    skinPath.push(".\\css\\" + FILE_HEADER + "-" + skinId[i] + ".css");
}

/**
 * 
 * @param {Number} id 皮肤ID
 * @returns -1:皮肤切换失败；0:皮肤切换成功
 */
function changeSkin(id) {
    //console.log("Changing skin:" + id);
    if (id < MIN_SKIN_ID || id > MAX_SKIN_ID) {
        return -1;
    }
    SKINLINK.setAttribute("href", skinPath[id]);
    return 0;
}

function getCurrentSkinPath() {
    return SKINLINK.getAttribute("href");
}

function getSkinId(path) {
    var id = path.slice(7 + FILE_HEADER.length, -4);
    for (var i = MIN_SKIN_ID; i <= MAX_SKIN_ID; i++) {
        if ("" + skinId[i] == id) {
            return i;
        }
    }
    return -1;
}

function getCurrentSkinId() {
    return getSkinId(getCurrentSkinPath());
}

function refreshSkinButtonText() {
    var keyText = "[F10]";
    var str = "";
    var id = getCurrentSkinId();
    str = __SKIN_HINTS[id];
    str += keyText;
    button_changeSkin.innerHTML = str;
}

function moveSkin() {
    var cur = getCurrentSkinId();
    //console.log("cur="+cur);
    var target = cur;
    if (cur + 1 > MAX_SKIN_ID) {
        target = MIN_SKIN_ID;
    } else {
        target += 1;
    }
    //console.log("target="+target);
    changeSkin(target);
    refreshSkinButtonText();
}