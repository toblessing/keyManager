var funcs = {}

funcs.getFile = function (file) {
    var url = "https://www.gleams.xyz/AL/" + file;
    var res = http.get(url);
    if (res.statusCode != 200) {
        toast("更新失败,请检查网络！")

    } else {
        files.ensureDir("/sdcard/ALFlow/" + file);
        files.writeBytes("/sdcard/ALFlow/" + file, res.body.bytes());

    }
}

funcs.activation = function (code) {
    var url = "http://autolook.gleams.xyz/activation?code=" + code;
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
            return false

        }

    }
}
funcs.activationWindow = function () {
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
        rawInput("请输入激活码", "",(code) =
>
    {
        if (!funcs.activation(code)) {
            engines.stopAll()
        } else {
            engines.myEngine().forceStop()
        }
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

funcs.checkCode = function () {
    var codeDB = storages.create("zyx.gleams.code");
    if (codeDB.contains("code")) {

        var code = codeDB.get("code")

        var url = "http://autolook.gleams.xyz/checkCode?code=" + code;
        var res = http.get(url);
        if (res.statusCode != 200) {
            toast("连接失败，请检查网络！")
            return false
        } else {
            var result = res.body.string();
            if (result == "true") {
                return true
            } else {
                return false
            }

        }
    } else {
        return false
    }
}


module.exports = funcs;