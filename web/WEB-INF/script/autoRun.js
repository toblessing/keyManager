var sc
var config = storages.create("autoLookConfig");

var appList = config.get("appList")

while (true) {
    // if (geth() == 8) {
    //     device.keepScreenOn(1000 * 60 * 60 * 15)
    // }
    // while (geth() < 23 && geth() >= 8) {\
    var i
    if (config.contains("lastApp")) {
        i = config.get("lastApp")
    } else {
        i = 0
    }
    for (; i < appList.length; i++) {
        var appob = appList[i]
        if (appob.open) {
            config.put("lastApp", i)
            sc = engines.execScriptFile("/sdcard/ALFlow/" + appob.script);
            sleep(500)
            delayStop(sc, appob.runHours)
            stopApp(appob.appName)
        }

    }

}


function getmin() {
    var date = new Date()
    return ((date.getTime() / 60000) >> 0) + 3 * 60

}

function geth() {
    return new Date().getHours()

}

function delayStop(sc, h) {
    var passMin
    if (config.contains("passMin")) {
        passMin = config.get("passMin")
    } else {
        passMin = 0
    }
    var min = getmin() - passMin
    while (getmin() - min < ((60 * h))) {
        // if (geth() >= 23) {
        //     break;
        // }
        // toast(getmin() - min)
        config.put("passMin", getmin() - min)
        sleep(1000 * 60)
    }
    config.put("passMin", 0)
    sc.getEngine().forceStop()
}

function stopApp(appName) {
    shell("am force-stop " + getPackageName(appName), true)
}