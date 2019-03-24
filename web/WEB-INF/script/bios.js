var config = storages.create("autoLookConfig");
var appList = [
    {
        id: "qutoutiao",
        appName: "趣头条",
        script: "qutoutiaoAuto.js",
        runHours: 2,
        randomTimeStart: 25,
        randomTimeEnd: 35,
        open: true,
    },
    {
        id: "dongfang",
        appName: "东方头条",
        script: "dongfangAuto.js",
        runHours: 2,
        randomTimeStart: 25,
        randomTimeEnd: 35,
        open: true,
    },
    {
        id: "weili",
        appName: "微鲤看看",
        script: "weiliAuto.js",
        runHours: 2,
        randomTimeStart: 25,
        randomTimeEnd: 35,
        open: true,
    },
    {
        id: "yuetoutiao",
        appName: "悦头条",
        script: "yuetoutiaoAuto.js",
        runHours: 2,
        randomTimeStart: 25,
        randomTimeEnd: 35,
        open: true,
    },
    {
        id: "huasheng",
        appName: "花生头条",
        script: "huashengAuto.js",
        runHours: 2,
        randomTimeStart: 25,
        randomTimeEnd: 35,
        open: true,
    },
    {
        id: "jukandian",
        appName: "聚看点",
        script: "jukandianAuto.js",
        runHours: 2,
        randomTimeStart: 25,
        randomTimeEnd: 35,
        open: true,
    },
    {
        id: "souhu",
        appName: "搜狐资讯",
        script: "souhuAuto.js",
        runHours: 2,
        randomTimeStart: 25,
        randomTimeEnd: 35,
        open: true,
    },
    {
        id: "jiuhuang",
        appName: "韭黄",
        script: "jiuhuangAuto.js",
        runHours: 2,
        randomTimeStart: 25,
        randomTimeEnd: 35,
        open: true,
    },
]


config.put("appList", appList);
config.put("historyTitleSize", 10)
//申请root权限
var ra = new RootAutomator();
ra.tap(0, 0);
ra.exit


//获取脚本文件
getFile("module.js");
// getFile("testView.js");
// getFile("autoRun.js")

// sleep(300);
//打开主界面
// engines.execScriptFile("/sdcard/ALFlow/testView.js");
exeRemoteScript("testView.js")


//导入模块
var funcs = require("/sdcard/ALFlow/module.js")


//检查是否激活，未激活则提示激活，若取消则关闭所有脚本
var reset = true
while (config.get("isClose") && reset && !funcs.checkCode()) {
    // activationWindow()
    engines.execScript("activationWindow", "activationWindow();" + activationWindow.toString() + activation.toString());
    while (!(config.contains("building") && config.get("building"))) ;
    var activating = dialogs.build({
        title: "激活中...",
        progress: {
            max: -1
        },
        cancelable: false
    }).show();
    config.put("building", false)
    while (!funcs.checkCode() && !(config.contains("isFaild") && config.get("isFaild"))) {
        sleep(1000)
    }
    activating.dismiss();
    if (config.contains("isFaild") && config.get("isFaild")) {
        config.put("isFaild", false)
        if (!confirm("激活失败,是否重试?")) {
            reset = false
            engines.stopAll()
        }
    }

}

//循环获取资源文件
if (funcs.checkCode()) {
    for (var i = 0; i < appList.length; i++) {
        var appob = appList[i]
        getFile(appob.script)
        toast("更新中(" + (i + 1) + "/" + appList.length + ")")
    }
    getFile("float.js")
    sleep(300)
    engines.execScriptFile("/sdcard/ALFlow/float.js");
}


// engines.myEngine().forceStop()
function getFile(file) {
    var url = "https://www.gleams.xyz/AL/" + file;
    var res = http.get(url);
    if (res.statusCode != 200) {
        toast("更新失败")

    } else {
        files.ensureDir("/sdcard/ALFlow/" + file);
        files.writeBytes("/sdcard/ALFlow/" + file, res.body.bytes());

    }
}

function exeRemoteScript(script) {
    engines.execScript(script, "exe(\"" + script + "\");" + exe.toString());

    function exe(script) {
        var codeDB = storages.create("zyx.gleams.code");
        var code = ""
        if (codeDB.contains("code")) {
            code = codeDB.get("code")
        }
        var url = "https://autolook.gleams.xyz/getScript?file=" + script + "&code=" + code;
        var res = http.get(url);
        if (res.statusCode != 200) {
            if (res.statusCode == 404 || res.statusCode == 503) {
                alert("网络或服务器问题，请检查网络或者联系管理员")
            } else {
                alert("更新失败")
            }
        } else {
            var result = res.body.string()
            if (result == "codeErr") {
                alert("激活码错误！")
            } else if (result == "codeExdate") {
                alert("激活码已过期！")
            } else {
                engines.execScript(script, result);
            }

        }

    }
}

function activationWindow() {
    dialogs.build({
        //对话框标题
        title: "本软件尚未激活，是否立即激活？",
        //对话框内容
        // content: "更新日志: 新增了若干了BUG",
        //确定键内容
        positive: "激活",
        //取消键内容
        negative: "取消",
        //中性键内容
        neutral: "获取激活码",
        canceledOnTouchOutside: false
        //勾选框内容
        // checkBoxPrompt: "不再提示"
    }).on("positive", () = > {
        //监听确定键
        // toast("激活")
        rawInput("请输入激活码", "",(code) =
>
    {
        engines.execScript("activation", "activation(\"" + code + "\");" + activation.toString());
    }
)
    ;
}).
    on("neutral", () = > {
        //监听中性键
        dialogs.build({
            title: "请加微信了解",
            content: "按“确定”复制微信：",
            positive: "确定",
            canceledOnTouchOutside: false
        }).on("positive", () = > {
            setClip(""
)
    toast("已复制微信：")
    engines.stopAll()

    return false
}).
    on("cancel", () = > {
        toast("quxiao"
)
    engines.stopAll()
    return false
}).
    show();
}).
    on("cancel", (checked) = > {
        //监听对话框被取消
        toast("quxiao"
)
    engines.stopAll()

    return false
}).
    show();
}

function activation(code) {
    var url = "http://autolook.gleams.xyz/activation?code=" + code;
    var config = storages.create("autoLookConfig")
    config.put("building", true)
    // alert(url)
    var res = http.get(url);
    if (res.statusCode != 200) {
        toast("激活失败,请检查网络！")
        return false

    } else {
        var result = res.body.string();
        if (result == "true") {
            toast("激活成功")
            var codeDB = storages.create("zyx.gleams.code");
            codeDB.put("code", code)
            return true

        } else {
            toast("激活失败")
            config.put("isFaild", true)
            return false

        }

    }
}
