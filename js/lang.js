//lang.js
var lang = {
    "en-US": {
        "languageName": "English",
        "colon": ":",
        "_time": "Time",
        "_author_link": "~ GitHub UUTT Instructions & Wiki ~",
        "_to_Task_Mode": "To Task Mode",
        "_to_Sandbox_Mode": "To Sandbox Mode",
        "_mode_Cache_Exist": "You are in <strong>Task Mode</strong> but have <strong>not</strong> launched a task yet.<br>Press <strong>" + __FK_LAUNCH_TASK + "</strong> to launch a new task!<br>Typing is meaningless now.",
        "_no_Task_Info": "NO TASK INFO",
        "_sandbox_Mode": "SANDBOX MODE",
        "_timer_Running": "Timer is <strong>running</strong>",
        "_timer_Stopped": "Timer <strong>stopped</strong>",
        "_fontSize_Default": "<strong>(Default)</strong>",
        "_fontSize_Minimum": "<strong>(Minimum)</strong>",
        "_fontSize_Display": "IO Area Font Size: ",
        "_current_Skin": "Current Skin Name: ",
        "_random_Article_Group": "**Random Article Group**",
        "_selected_Article_Group": "Selected Article Group: ",
        "_selected_Article": "Selected Article: ",
        "_clear_Mode": "(Clear Mode) ",
        "_typing_Progress_Invalid": ": Progress is invalid",
        "_typing_Progress": "Progress: ",
        "_keyTip_Invalid": ": Key Tip is invalid",
        "_keyTip_Empty": ": KeyTip is empty",
        "_space_Key": "Space",
        "_enter_Key": "Enter",
        "_please_Press_Key": "Please press KEY:&nbsp;&nbsp;&nbsp;",
        "_keyTip_Done_1": "Nice Job!<br>You completed your task within ",
        "_keyTip_Done_2": " seconds!<br>Press <strong>" + __FK_LAUNCH_TASK + "</strong> to launch a new task!",
        "_letters_Per_Second": "   letters/s",
        "_letters_Per_Minute": "   letters/min",
        "_counter_Typed": " Ltr(s)&Sp(s)",
        "_counter_Backspace": " Backspace(s)",
        "_counter_Keydown": " Keydown(s)",
        "_button_Clear_Restart": "Clear & Restart Timer ",
        "_button_Launch": "Launch New Task! (TaskMode) ",
        "_button_Restart": "Restart Timer ",
        "_button_Change_Skin": "Change Skin ",
        "_button_Default_FontSize": "Default Font Size ",
        "_button_Trl": "Typing Record List (TRL) ",
        "instructions":
            "Welcome to <strong>UU E</strong>nglish <strong>T</strong>yping <strong>T</strong>rainer (UUETT)!"
            + "<br>***Your keyboard input has been restricted on this page and you cannot enter any characters other than English (and punctuation)."
            + "<br>*Press the <strong>" + __FK_CLEAR + "</strong> / <strong>Backspace</strong> (continuously) / <strong>" + __FK_MODE_SWITCH + "</strong> key to clear these instructions."
            + "<br>***<strong>Functional Key Instructions</strong>:"
            + "<br>*Press the <strong>" + __FK_CLEAR_MODE_SWITCH + "</strong> <em>(Clear Mode Key)</em> key to hide/display following areas: <strong> TITLE, COUNT, KEYTIP, BUTTON and AUTHOR.</strong>"
            + "<br>*Press the <strong>" + __FK_TRL_SWITCH + "</strong> key to hide/display the Typing Record List (TRL). <em>It is on your left.</em>"
            + "<br>*Press <strong>" + __FK_MODE_SWITCH + "</strong> then <strong>" + __FK_LAUNCH_TASK + "</strong> to launch a new task randomly from the file \".\\js\\tasks.js\" and start your practice."
            + "<br>*Press the <strong>" + __FK_BA_SWITCH + "</strong> key to hide/display the Button Area. <em>It is on your right.</em>"
            + "<br>*Press the <strong>" + __FK_MOVE_SKIN + "</strong> key to change skin."
            + "<br>*Press the <strong>" + __FK_TIMER_TOGGLE + "</strong> key to start/stop your inputing and the timer."
            + "<br>*Press the <strong>" + __FK_INCREASE_FONT_SIZE + "</strong> / <strong>" + __FK_DECREASE_FONT_SIZE + "</strong> key to increase / decrease the size of the text of input&display area; press the <strong>" + __FK_DEFAULT_FONT_SIZE + "</strong> key to set them to the default size."
            + "<br>***You can add new typing tasks by modifying the file \".\\js\\tasks.js\"."
            + "<br>***If you want to enter a line break (i.e. <strong>Enter</strong> key) in a typing task, type\"&lt;br&gt;\" into the file."
            + "<br>***Note: If the length of a single typing task is too long (greater than 500 letters), your browser will take more time to load it, usually LONGER than 0.6 seconds."
            + "<br>***You have to make sure you type <strong>EVERY</strong> letter correctly. In this way, the program can determine that you have completed the typing task."
            + "<br>***The default fonts used for this page are <strong>\"" + __DEFAULT_FONT_TYPING + "\"</strong>(Typing Area), and <strong>\"" + __DEFAULT_FONT_OTHER + "\"</strong>(Other Areas). If you do not have a font file for these fonts on your computer, the browser will use the default font to replace the missing font."
            + "<br>***🌏Interface Language Settings🌏: Go to Repository Wiki!"
            + "<br><br><br><br><br><br><br><br><br><br>"
    },
    "zh-CN": {
        "languageName": "简体中文",
        "colon": "：",
        "_time": "时间",
        "_author_link": "~ GitHub UUTT 使用说明与Wiki ~",
        "_to_Task_Mode": "切换至任务模式",
        "_to_Sandbox_Mode": "切换至沙盒模式",
        "_mode_Cache_Exist": "您现在处于<strong>任务模式</strong>，但<strong>还没有</strong>启动任务。<br>按 <strong>" + __FK_LAUNCH_TASK + "</strong> 键来启动新任务！<br>打字现在无意义。",
        "_no_Task_Info": "无任务",
        "_sandbox_Mode": "沙盒模式",
        "_timer_Running": "计时器<strong>运行中</strong>",
        "_timer_Stopped": "计时器<strong>已停止</strong>",
        "_fontSize_Default": "<strong>(默认值)</strong>",
        "_fontSize_Minimum": "<strong>(最小值)</strong>",
        "_fontSize_Display": "当前打字区域字体大小：",
        "_current_Skin": "当前皮肤名称：",
        "_random_Article_Group": "**随机文章组模式**",
        "_selected_Article_Group": "选中文章组：",
        "_selected_Article": "选中文章号：",
        "_clear_Mode": "(清净模式) ",
        "_typing_Progress_Invalid": "：打字进度不可用",
        "_typing_Progress": "进度：",
        "_keyTip_Invalid": "：按键提示不可用",
        "_keyTip_Empty": "：按键提示为空",
        "_space_Key": "空格键",
        "_enter_Key": "回车键",
        "_please_Press_Key": "请按键：&nbsp;",
        "_keyTip_Done_1": "干得漂亮！<br>您用了",
        "_keyTip_Done_2": "秒的时间完成了这段文本！<br>按 <strong>" + __FK_LAUNCH_TASK + "</strong> 键以启动新任务！",
        "_letters_Per_Second": "   字母/秒",
        "_letters_Per_Minute": "   字母/分钟",
        "_counter_Typed": " 次字母与空格",
        "_counter_Backspace": " 次退格",
        "_counter_Keydown": " 次按键",
        "_button_Clear_Restart": "清除输入及计时器 ",
        "_button_Launch": "启动新任务 ",
        "_button_Restart": "重置计时器 ",
        "_button_Change_Skin": "切换皮肤 ",
        "_button_Default_FontSize": "恢复默认字体大小 ",
        "_button_Trl": "显示/隐藏打字记录列表 ",
        "instructions":
            "欢迎使用<strong>UU英文打字练习器</strong> (UUETT)！"
            + "<br>***您在本页上的键盘输入已被限制，您不能输入除英文(和标点符号)以外的任何字符。"
            + "<br>*按 <strong>" + __FK_CLEAR + "</strong> / 连续按<strong>退格键</strong> / <strong>" + __FK_MODE_SWITCH + "</strong> 键，来清除本页说明。"
            + "<br>***<strong>功能键概述</strong>："
            + "<br>*按 <strong>" + __FK_CLEAR_MODE_SWITCH + "</strong> <em>(清净模式键)</em> 键，来隐藏/显示以下区域: <strong> 标题区域（左上）、计数区域（右上）、按键提示区域（左下）、作者区域（右下）、按钮区域（右侧）。</strong>千万别忘了切换回去！"
            + "<br>*按 <strong>" + __FK_TRL_SWITCH + "</strong> 键，来隐藏/显示 打字记录列表(TRL)。 <em>（位于页面左侧靠下）</em>"
            + "<br>*（核心功能）按 <strong>" + __FK_MODE_SWITCH + "</strong> 键，然后按 <strong>" + __FK_LAUNCH_TASK + "</strong> 键，就能随机从文件 \".\\js\\tasks.js\" 中抽取一个文段并开始你的打字练习。"
            + "<br>*按 <strong>" + __FK_BA_SWITCH + "</strong> 键，来隐藏/显示按钮区域。 <em>（位于页面右侧靠下）</em>"
            + "<br>*按 <strong>" + __FK_MOVE_SKIN + "</strong> 键来切换皮肤。"
            + "<br>*按 <strong>" + __FK_TIMER_TOGGLE + "</strong> 键，开始/停止打字输入和计时。"
            + "<br>*按 <strong>" + __FK_INCREASE_FONT_SIZE + "</strong> / <strong>" + __FK_DECREASE_FONT_SIZE + "</strong> 键，以增大/减小打字区域的字体大小；按 <strong>" + __FK_DEFAULT_FONT_SIZE + "</strong> 键来设置成默认大小。"
            + "<br>***您可以通过修改文件 \".\\js\\tasks.js\" 来添加或删除打字任务和文章组。"
            + "<br>***如果您想要在任务文本中添加一个换行符 (也就是<strong>回车</strong>键)，请用\"&lt;br&gt;\"来代替。（千万不可直接在任务文本中换行！）"
            + "<br>***注：如果单个任务文本的长度太长 (长于500个字母)，您的浏览器将会花费更多时间来加载这个任务，一般要多于0.6秒。"
            + "<br>***您必须对照任务文本，将<strong>每一个</strong>字母输入正确。以这种方式，程序才能确定您完成了这次打字任务。"
            + "<br>***本页面使用的默认字体有：<strong>在打字区域：" + __DEFAULT_FONT_TYPING + "</strong> ；<strong>在其他区域：" + __DEFAULT_FONT_OTHER + "</strong>。如果您的电脑上没有相关字体文件，浏览器将会用默认字体替代它。（可能是宋体，也可能是微软雅黑等）"
            + "<br>***🌏界面语言设定🌏：请参见仓库Wiki！"
            + "<br><br><br><br><br><br><br><br><br><br>"
    },
    "zh-TW": {
        "languageName": "繁體中文",
        "colon": "：",
        "_time": "時間",
        "_author_link": "~ GitHub UUTT 使用説明與Wiki ~",
        "_to_Task_Mode": "切換至任務模式",
        "_to_Sandbox_Mode": "切換至沙盒模式",
        "_mode_Cache_Exist": "您現在處於<strong>任務模式</strong>，但<strong>還沒有</strong>啓動任務。<br>按 <strong>" + __FK_LAUNCH_TASK + "</strong> 鍵來啓動任務！<br>打字現在無意義。",
        "_no_Task_Info": "無任務",
        "_sandbox_Mode": "沙盒模式",
        "_timer_Running": "計時器<strong>運行中</strong>",
        "_timer_Stopped": "計時器<strong>停止</strong>",
        "_fontSize_Default": "<strong>(默認值)</strong>",
        "_fontSize_Minimum": "<strong>(最小值)</strong>",
        "_fontSize_Display": "當前打字區域字體大小：",
        "_current_Skin": "當前皮膚名稱：",
        "_random_Article_Group": "**隨機文章組模式**",
        "_selected_Article_Group": "選中文章組：",
        "_selected_Article": "選中文章號：",
        "_clear_Mode": "(清净模式) ",
        "_typing_Progress_Invalid": "：打字進度不可用",
        "_typing_Progress": "進度：",
        "_keyTip_Invalid": "：按鍵提示不可用",
        "_keyTip_Empty": "：按鍵提示為空",
        "_space_Key": "空格鍵",
        "_enter_Key": "回車鍵",
        "_please_Press_Key": "請按鍵：&nbsp;",
        "_keyTip_Done_1": "幹得漂亮！<br>您共花費",
        "_keyTip_Done_2": "秒的時間完成了這段文本！<br>按 <strong>" + __FK_LAUNCH_TASK + "</strong> 鍵以啓動新任務！",
        "_letters_Per_Second": "   字母/秒",
        "_letters_Per_Minute": "   字母/分鐘",
        "_counter_Typed": " 次字母與空格",
        "_counter_Backspace": " 次退格",
        "_counter_Keydown": " 次按鍵",
        "_button_Clear_Restart": "清除輸入及計時器 ",
        "_button_Launch": "啓動新任務 ",
        "_button_Restart": "重置計時器 ",
        "_button_Change_Skin": "切換皮膚 ",
        "_button_Default_FontSize": "恢復默認字體大小 ",
        "_button_Trl": "顯示/隱藏打字記錄列表 ",
        "instructions":
            "歡迎使用<strong>UU英文打字練習器</strong> (UUETT)！"
            + "<br>***您在本頁上的鍵盤輸入已被限制，您不能輸入除英文(和標點符號)以外的任何字符。"
            + "<br>*按 <strong>" + __FK_CLEAR + "</strong> / 連續按<strong>退格鍵</strong> / <strong>" + __FK_MODE_SWITCH + "</strong> 鍵，來清除本頁說明。"
            + "<br>***<strong>功能鍵概述</strong>："
            + "<br>*按 <strong>" + __FK_CLEAR_MODE_SWITCH + "</strong> <em>(清净模式鍵)</em> 鍵，以隱藏/顯示以下區域: <strong> 標題區域（左上）、計數區域（右上）、按鍵提示區域（左下）、作者區域（右下）、按鈕區域（右側）。</strong>千萬別忘了切換回去！"
            + "<br>*按 <strong>" + __FK_TRL_SWITCH + "</strong> 鍵，以隱藏/顯示 打字記錄列表(TRL)。 <em>（位於頁面左側靠下）</em>"
            + "<br>*（核心功能）按 <strong>" + __FK_MODE_SWITCH + "</strong> 鍵，然後按 <strong>" + __FK_LAUNCH_TASK + "</strong> 鍵，就能隨機從文件 \".\\js\\tasks.js\" 中抽取一個文段並開始您的打字練習。"
            + "<br>*按 <strong>" + __FK_BA_SWITCH + "</strong> 鍵，以隱藏/顯示按鈕區域。 <em>（位於頁面右側靠下）</em>"
            + "<br>*按 <strong>" + __FK_MOVE_SKIN + "</strong> 鍵以切換皮膚。"
            + "<br>*按 <strong>" + __FK_TIMER_TOGGLE + "</strong> 鍵，開始/停止打字輸入和計時。"
            + "<br>*按 <strong>" + __FK_INCREASE_FONT_SIZE + "</strong> / <strong>" + __FK_DECREASE_FONT_SIZE + "</strong> 鍵，以增大/減小打字區域之字體大小；按 <strong>" + __FK_DEFAULT_FONT_SIZE + "</strong> 鍵以設置成默認大小。"
            + "<br>***您可以通過修改文件 \".\\js\\tasks.js\" 以添加或刪除打字任務和文章組。"
            + "<br>***如果您想要在任務文本中添加一個換行符 (也就是<strong>回車</strong>鍵)，請用\"&lt;br&gt;\"來代替。（千萬不可直接在任務文本中換行！）"
            + "<br>***註：如果單個任務文本的長度過長 (長於500個字母)，您的網頁瀏覽器將會花費更多時間來加載這個任務，通常多於0.6秒。"
            + "<br>***您必須對照任務文本，將<strong>每一個</strong>字母輸入正確。只有這樣，程序才能確定您完成了這次打字任務。"
            + "<br>***本頁面使用的默認字體有：<strong>在打字區域：" + __DEFAULT_FONT_TYPING + "</strong> ；<strong>在其他區域：" + __DEFAULT_FONT_OTHER + "</strong>。如果您的計算機上沒有相關字體文件，瀏覽器將會用默認字體替代它。（可能是宋體，也可能是微軟雅黑等）"
            + "<br>***🌏界面語言設定🌏：請參見Github本倉庫Wiki！"
            + "<br><br><br><br><br><br><br><br><br><br>"
    }
};