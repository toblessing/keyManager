var historyTitle = new Array();
if (device.sdkInt < 24) {
    var swipe = Swipe
}
var appName = "微鲤看看"

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
sleep(5000);

//异常窗口处理
exceptionWindowDispose()
sleep(500)

// =====================
// 切换到头条文章页面
clickHome()

sleep(5000)
var screenNumber = 1

while (true) {

    var plateList = packageName("cn.weli.story").className("android.widget.LinearLayout").find()
    var isZero = true
    if (plateList != null) {
        //脚本循环主体
        plateList.forEach(function (onePlate) {

            //筛选出文章板块
            if (exceptionPlateCheck(onePlate)) {
                var title = onePlate.findOne(textMatches(/[\u4e00-\u9fa5|\s，,.。：:？?<>《》“”""！!|0-9]{7,}/)).text()
                //确认文章有效
                if (title !== null) {

                    //确认文章未被阅读过
                    if (!comparaHistoryTitle(title)) {
                        // toast("进入文章:" + title)
                        isZero = false
                        // onePlate.click()
                        clickFromBounds(onePlate.bounds())
                        sleep(500)
                        exceptionWindowDispose()
                        for (var i = 0; i < random(25, 35); i++) {

                            if (i % 10 < 5) {
                                sleep(1000)
                                swipe(device.width / 2, (device.height * (6 / 8)), device.width / 2, (device.height * (1 / 8)), random(200, 400));
                            } else {
                                sleep(1000)
                                swipe(device.width / 2, (device.height * (1 / 8)), device.width / 2, (device.height * (6 / 8)), random(200, 400));
                            }
                            exceptionWindowDispose()

                            var ex = text("展开查看全文").findOne(10)
                            if (ex !== null) {
                                ex.parent().click()
                            }
                            if ((i + 1) % 30 == 0)
                                toast((i + 1) / 30 + "个红包")

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
        clickHome()
        screenNumber = 1
        sleep(3000)
    } else {

        screenNumber++
        toast("下一屏")
        nextScreen()
        sleep(1000);

    }

}


function clickFromBounds(bound) {
    click(bound.centerX(), bound.centerY())
}

function clickHome() {
    toast("点击头条")
    var home = id("rl_bottom_1").findOne(10000)
    home.click()
}

function nextScreen() {
    swipe(device.width / 2, (device.height * (30 / 32)), device.width / 2, 0, 500);
}

function exceptionPlateCheck(onePlate) {
    if (onePlate.findOne(text("广告"))) {
    } else if (onePlate.findOne(textContains("|"))) {
    } else if (onePlate.findOne(text("置顶"))) {
    } else if (onePlate.findOne(text("淘宝精选"))) {
    } else if (onePlate.findOne(text("视频"))) {
    } else if (onePlate.findOne(textMatches("\\d+图"))) {
    } else if (onePlate.findOne(textMatches(/[\u4e00-\u9fa5|\s，,.。：:？?<>《》“”""！!|0-9]{7,}/)) == null) {
        toast("1")
    } else if (onePlate.findOne(id("tv_title")) == null) {
    } else {
        return true
    }

    return false
}


function exceptionWindowDispose() {
    // var beforWindow = 0;


    if (text("前往开启").findOne(10) != null) {
        className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("立即开启").findOne(10) != null) {
        className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("了解更多").findOne(10) != null) {
        className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("微鲤看看发来红包").findOne(10) != null) {
        className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("先去逛逛").findOne(10) != null) {
        text("先去逛逛").findOne(10).click()
        // beforWindow++
    } else if (text("收下啦").findOne(10) != null) {
        text("收下啦").findOne(10).click()
        // beforWindow++
    } else if (text("微鲤福利").findOne(10) != null) {
        id("iv_take").findOne(10).click()
        id("iv_close").findOne(2000).click()
    } else if (id("iv_close").findOne(10) != null) {
        id("iv_close").findOne(10).click()
    } else if (text("知道了").findOne(10) != null) {
        text("知道了").findOne(10).click()
        // beforWindow++
    } else if (text("继续阅读").findOne(10) != null) {
        text("继续阅读").findOne(10).click()
        // beforWindow++
    } else if (textMatches("阅读\\d+分钟还有").findOne(10) != null) {
        textMatches("阅读\\d+分钟还有").findOne(10).click()
        // beforWindow++
    }


}

function comparaHistoryTitle(title) {
    var config = storages.create("autoLookConfig");

    if (historyTitle.toString().indexOf("," + title) == -1) {
        historyTitle.push(title);
        while (historyTitle.length > config.get("historyTitleSize")) {
            historyTitle.shift()
        }
        return false;
    } else {
        return true;
    }

}