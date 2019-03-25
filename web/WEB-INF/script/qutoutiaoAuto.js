if (device.sdkInt < 24) {
    var swipe = Swipe
}
var appName = "趣头条"
var historyTitle = new Array();
var config = storages.create("autoLookConfig");
config.put("readNum", 0)
config.put("loop", 0)
var delay;

var areaX = (device.width - 80);
var areaHeight = device.height;
if (!requestScreenCapture()) {
    toast("请求截图失败");
    stop();
}
auto();
if (!launchApp(appName)) {
    toast("打开app失败,请确认已安装" + appName + "应用")
    engines.myEngine().forceStop()
}
toast("等待进入app")
sleep(10000);

//异常窗口处理
exceptionWindowDispose()


// =====================
// 切换到头条文章页面
toast("点击头条")
var home = packageName("com.jifen.qukan").className("android.widget.Button").text("头条").findOne(1000)
if (home == null) {
    packageName("com.jifen.qukan").className("android.widget.Button").text("刷新").findOne(1000).click()
} else {
    home.click()
}


sleep(5000)
var screenNumber = 1

while (true) {
    config.put("loop", config.get("loop") + 1)

    var plateList = packageName("com.jifen.qukan").className("android.widget.LinearLayout").find()
    // toast("板块数量："+plateList.length)
    sleep(1000)
    // plateList.forEach(function (onePlate) {
    //     try {
    //         if(onePlate.findOne(id("a1m"))!=null){
    //             toast("找到标题了："+onePlate.findOne(id("a1m")).text())
    //         }
    //     } catch (e) {

    //     }
    //     sleep(1000)
    // })
    var isZero = true
    if (plateList != null) {
        //脚本循环主体
        plateList.forEach(function (onePlate) {

            //筛选出文章板块
            if (exceptionPlateCheck(onePlate)) {
                var title = onePlate.findOne(textMatches(/[\u4e00-\u9fa5|，,.。：:？?<>《》“”""！!|0-9]{7,}/)).text()
                toast(title)
                //确认文章有效
                if (title !== null) {

                    //确认文章未被阅读过
                    if (!comparaHistoryTitle(title)) {
                        // toast("进入文章:" + title)
                        isZero = false
                        onePlate.click()
                        config.put("readNum", config.get("readNum") + 1)
                        for (var i = 0; i < random(25, 35); i++) {

                            if (i % 10 < 5) {
                                sleep(1000)
                                swipe(device.width / 2, (device.height * (7 / 8)), device.width / 2, (device.height * (1 / 8)), random(200, 400));
                            } else {
                                sleep(1000)
                                swipe(device.width / 2, (device.height * (1 / 8)), device.width / 2, (device.height * (7 / 8)), random(200, 400));
                            }

                            if ((i + 1) % 26 == 0)
                                toast((i + 1) / 26 + "个趣头条红包")

                            // break
                        }
                        toast("返回主页")
                        back()
                        sleep(2000)

                    }

                }
            }

        })
    }
    if (isZero || screenNumber % 5 == 0) {
        toast("点击头条")
        var home = packageName("com.jifen.qukan").className("android.widget.Button").text("头条").findOne(1000)
        if (home == null) {
            packageName("com.jifen.qukan").className("android.widget.Button").text("刷新").findOne(1000).click()
        } else {
            home.click()
        }
        screenNumber = 1
        sleep(3000)
    } else {

        screenNumber++
        toast("下一屏")
        nextScreen()
        sleep(1000);

    }

}

function nextScreen() {
    swipe(device.width / 2, (device.height * (30 / 32)), device.width / 2, 0, 500);
}

function exceptionPlateCheck(onePlate) {
    if (onePlate.findOne(text("广告"))) {
    } else if (onePlate.findOne(id("x7"))) {
    } else if (onePlate.findOne(text("置顶"))) {
    } else if (onePlate.findOne(text("热门"))) {
    } else if (onePlate.findOne(text("淘宝精选"))) {
    } else if (onePlate.findOne(text("视频"))) {
    } else if (onePlate.findOne(text("搜索你感兴趣的内容"))) {
    } else if (onePlate.findOne(textMatches("\\d+图"))) {
    } else if (onePlate.findOne(textMatches("|"))) {
    } else if (onePlate.findOne(textMatches(/[\u4e00-\u9fa5|，,.。：:？?<>《》“”""！!|0-9]{7,}/)) == null) {
    } else {
        return true
    }
    // toast("这个板块不符合规范")
    return false
}


function exceptionWindowDispose() {
    // var beforWindow = 0;


    if (text("前往开启").findOne(10) != null) {
        packageName("com.jifen.qukan").className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("立即开启").findOne(10) != null) {
        packageName("com.jifen.qukan").className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("了解更多").findOne(10) != null) {
        packageName("com.jifen.qukan").className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("先去逛逛").findOne(10) != null) {
        text("先去逛逛").findOne(10).click()
    } else if (text("忽略").findOne(10) != null) {
        text("忽略").findOne(10).click()
    }


}

function comparaHistoryTitle(title) {
    var config = storages.create("autoLookConfig");
    if (historyTitle.toString().indexOf(title) == -1) {
        historyTitle.push(title);
        while (historyTitle.length > config.get("historyTitleSize")) {
            historyTitle.shift()
        }
        return false;
    } else {
        return true;
    }

}