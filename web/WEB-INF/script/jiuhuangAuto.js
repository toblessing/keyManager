var historyTitle = new Array();
if (device.sdkInt < 24) {
    var swipe = Swipe
}
var appName = "韭黄"
var plateClassName = "android.widget.RelativeLayout"
var plateDepth = 3
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


// =====================
// 切换到头条文章页面
clickHome()

sleep(5000)
var screenNumber = 1

while (true) {
    exceptionWindowDispose()
    exceptionWindowDispose()

    var plateList = className(plateClassName).depth(plateDepth).find()
    var isZero = true
    if (plateList != null) {
        //脚本循环主体
        plateList.forEach(function (onePlate) {

            //筛选出文章板块
            if (exceptionPlateCheck(onePlate)) {
                var title = onePlate.findOne(textMatches(/[\u4e00-\u9fa5|\s，,.。：:？?<>《》“”""！!|0-9]{7,}/)).text()

                //确认文章有效s
                if (title !== null) {

                    //确认文章未被阅读过
                    if (!comparaHistoryTitle(title)) {
                        // toast("进入文章:" + title)
                        isZero = false
                        onePlate.click()
                        // clickFromBounds(onePlate.bounds())
                        sleep(1000)
                        exceptionWindowDispose()
                        for (var i = 0; i < random(25, 35); i++) {

                            if (i % 10 < 5) {
                                sleep(1000)
                                swipe(device.width / 2, (device.height * (7 / 8)), device.width / 2, (device.height * (1 / 8)), random(200, 400));
                            } else {
                                sleep(1000)
                                swipe(device.width / 2, (device.height * (1 / 8)), device.width / 2, (device.height * (7 / 8)), random(200, 400));
                            }

                            var ex = text("查看全文，奖励更多").depth(5).findOne(100)
                            if (ex == null) {
                                ex = text("查看全文，奖励更多").depth(4).findOne(100)
                            }
                            exceptionWindowDispose()
                            if (ex !== null) {
                                toast("点击全文")
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
    var home = text("头条").depth(2).findOne(5000)
    home.parent().click()


}

function nextScreen() {
    swipe(device.width / 2, (device.height * (28 / 32)), device.width / 2, 0, 500);
}

function exceptionPlateCheck(onePlate) {
    // toast("exceptionPlateCheck")
    if (onePlate.findOne(textMatches("广告.*"))) {
        toast("8")
    } else if (onePlate.findOne(id("txt_advName"))) {
        toast("7")
    } else if (onePlate.findOne(text("置顶"))) {
        toast("6")
    } else if (onePlate.findOne(text("新华社"))) {
        toast("5")
        // } else if (onePlate.findOne(id("item_artical_three_title_tv")) == null && onePlate.findOne(id("item_artical_right_title_tv")) == null) {
    } else if (onePlate.findOne(text("淘宝精选"))) {
        toast("4")
    } else if (onePlate.findOne(text("视频"))) {
        toast("3")
    } else if (onePlate.findOne(text("热门推荐"))) {
        toast("2")
    } else if (onePlate.findOne(textMatches(/[\u4e00-\u9fa5|\s，,.。：:？?<>《》“”""！!|0-9]{7,}/)) == null) {
        toast("1")
    } else if (onePlate.findOne(textMatches("\\d+图"))) {
    } else if (onePlate.findOne(textMatches(/\d+次播放/))) {
    } else if (onePlate.findOne(textMatches(/阅读\d+/)) == null) {
    } else {
        return true
    }

    sleep(1000)
    return false
}


function exceptionWindowDispose() {
    // var beforWindow = 0;


    if (text("前往开启").findOne(10) != null) {
        className("android.widget.ImageView").depth("1").click()
    }
    if (text("马上开启").findOne(10) != null) {
        className("android.widget.ImageView").depth("1").click()
    } else if (text("立即开启").findOne(10) != null) {
        className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("了解更多").findOne(10) != null) {
        className("android.widget.ImageView").depth("1").click()
        // beforWindow++
    } else if (text("先去逛逛").findOne(10) != null) {
        text("先去逛逛").findOne(10).click()
        // beforWindow++
    } else if (text("知道了").findOne(10) != null) {
        text("知道了").findOne(10).click()
        // beforWindow++
    } else if (text("继续阅读").findOne(10) != null) {
        text("继续阅读").findOne(10).click()
        // beforWindow++
    } else if (textMatches("阅读\\d+分钟还有").findOne(10) != null) {
        textMatches("阅读\\d+分钟还有").findOne(10).click()
        // beforWindow++
    } else if (text("忽略").findOne(10) != null) {
        text("忽略").findOne(10).click()
    } else if (text("我知道了").findOne(10) != null) {
        text("我知道了").findOne(10).parent().click()
    } else if (id("iv_public_close").findOne(10) != null) {
        id("iv_public_close").findOne(10).click()
    } else if (id("adstyle_close").findOne(10) != null) {
        id("adstyle_close").findOne(10).click()
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