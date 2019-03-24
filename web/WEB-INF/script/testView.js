"ui";

mainView();

function mainView() {

    ui.layout(
    < scroll >
    < vertical
    id = "root" >
        < text
    textStyle = "bold"
    margin = "20"
    gravity = "center_horizontal"
    textSize = "30sp"
    text = "AutoLook自动阅读网赚测试界面" / >
        < horizontal >
        < grid
    id = "selectList" >
        < checkbox
    id = "{{id}}Select"
    w = "100"
    h = "50"
    checked = "{{open}}"
    text = "{{appName}}"
    clickable = "false" / >
        < /grid>
        < grid
    id = "settingList" >
        < button
    id = "{{id}}Setting"
    layout_gravity = "right"
    h = "50"
    text = "设置"
    margin = "2" / >
        < /grid>
        < grid
    id = "appList" >
        < button
    id = "{{id}}"
    layout_gravity = "right"
    h = "50"
    text = "启动"
    margin = "2" / >
        < /grid>
        < /horizontal>
        < horizontal >
        < text
    id = "notion"
    text = "" / >
        < button
    id = "clear"
    layout_gravity = "right"
    text = "重置记录" / >

        < /horizontal >
        < text
    id = "notion2"
    text = "" / >
        < button
    id = "auto"
    text = "自动运行" / >
        < button
    id = "restart"
    text = "更新并重启" / >

        < /vertical>
        < /scroll>
)
    ;
}

var config = storages.create("autoLookConfig")
var appList = config.get("appList")
//设置列表视图的内容来源
ui.selectList.setDataSource(appList)
ui.settingList.setDataSource(appList)
ui.appList.setDataSource(appList)

//发送消息，关闭第一屏
config.put("isClose", true)

//检查无障碍是否开启
engines.execScript("auto", "auto.waitFor()");

if (config.contains("passMin") && config.contains("lastApp")) {
    ui.notion.setText("上次自动阅读浏览到" + config.get("appList")[config.get("lastApp")].appName + "\n阅读了" + config.get("passMin") + "分钟,点击自动阅读可以继续进行")
}

// engines.execScript("acti", "\"ui\";var funcs = require(\"/sdcard/ALFlow/module.js\");alert(\"jk\");if (!funcs.activationWindow()) {engines.stopAll()}");
// var funcs = require("/sdcard/ALFlow/module.js");

//设置监听器
ui.selectList.on("item_click", function (app, seNum, view) {
    if (view.isChecked() == true) {
        setAppOpen(app.id, true)
    } else {
        setAppOpen(app.id, false)
    }
})
ui.settingList.on("item_click", function (app) {
    toast(app.appName)
})
ui.appList.on("item_click", function (app) {
    engines.execScriptFile("/sdcard/ALFlow/" + app.script);
})
ui.auto.click(function () {
    engines.execScriptFile("/sdcard/ALFlow/autoRun.js");
})
ui.restart.click(function () {
    // engines.execScript("acti", "\"ui\";var funcs = require(\"/sdcard/ALFlow/module.js\");alert(\"jk\");if (!funcs.activationWindow()) {engines.stopAll()}");

    engines.execScriptFile("/sdcard/ALFlow/bios.js");
    sleep(1000)
    engines.myEngine().forceStop()

})
ui.clear.click(function () {
    config.put("passMin", 0)
    config.put("lastApp", 0)
})

function setAppOpen(id, open) {
    var config = storages.create("autoLookConfig")
    var appList = config.get("appList")
    for (var i = 0; i < appList.length; i++) {
        if (appList[i].id == id) {
            appList[i].open = open
            config.put("appList", appList)
            break
        }
    }
}
