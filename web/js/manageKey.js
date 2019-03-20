$(function () {
    if (true)
        $.post("manageKey?action=select",
            {},
            function (data, status) {
                if (status == "success") {
                    var codeList = JSON.parse(data);
                    localStorage.setItem("codeListStr", data);

                    $("#loading").hide();
                    setCodeTable(codeList);


                }
            }
        )
    $(".search").change(function () {

        searchUserAndCode()
    })
})


function showSearchUser() {
    $("#thUserText").hide();
    $("#thUserInput").show();
}

function showSearchCode() {
    $("#thCodeText").hide();
    $("#thCodeInput").show();
}

function hideSearchUser() {
    var userstr = $("#searchUser").val();
    if (userstr != null && userstr != "") {
        $("#searchUser").val("");

        searchUserAndCode()
    } else {
        $("#thUserText").show();
        $("#thUserInput").hide();

    }

}

function hideSearchCode() {
    var codestr = $("#searchCode").val();
    if (codestr != null && codestr != "") {
        $("#searchCode").val("");

        searchUserAndCode()
    } else {
        $("#thCodeText").show();
        $("#thCodeInput").hide();

    }
}

function searchUserAndCode() {

    var data = localStorage.getItem("codeListStr");
    var codeList = JSON.parse(data);
    var resultList = [];
    var userstr = $("#searchUser").val();
    var codestr = $("#searchCode").val();
    // alert("搜索：" + codestr + "," + userstr)
    if (codestr == null || codestr == "") {
        codestr = /.*/
    }
    if (userstr == null || userstr == "") {
        userstr = /.*/

    }
    for (var j in codeList) {
        if (codeList[j].user.match(userstr) != null && codeList[j].activationCode.match(codestr) != null) {
            resultList.push(codeList[j]);
        }
    }
    setCodeTable(resultList)
}

function setCodeTable(codeList) {
    var codeTable = $("#codeTable");
    $(".tab-content").remove();
    for (var i = 0; i < codeList.length; i++) {
        var code = codeList[i];
        var trlabel;
        if (code.enabled) {
            trlabel = "<tr class='tab-content'>";
        } else {
            trlabel = "<tr class='tab-content disable' >"
        }
        trlabel += "<td>" + code.activationCode + "</td>";
        trlabel += "<td>" + code.exdate + "</td>";
        trlabel += "<td>" + code.user + "</td>";
        trlabel += "<td>" + code.admin + "</td>";
        trlabel += "<td>" + code.available + "</td>";
        trlabel += "<td>" + code.unavailable + "</td>";
        trlabel += "<td><a style=\"    font-size: 12px;padding: 3px 8px;\" class=\"link_button\"\n" +
            "                           href=\"renewalKey.jsp?activationCode=" + code.activationCode + "\">续费</a>"
        trlabel += "</tr>"
        codeTable.append(trlabel)
    }
}