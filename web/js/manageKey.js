$(function () {
    $.post("manageKey?action=select",
        {},
        function (data, status) {
            var codeList = JSON.parse(data);
            var codeTable = $("#codeTable");
            $("#loading").hide()
            for (var i = 0; i < codeList.length; i++) {
                var code = codeList[i];
                var trlabel;
                if (code.enabled) {
                    trlabel = "<tr>";
                } else {
                    trlabel = "<tr class=disable >"
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
    )
})

function searchUser() {
    // $("#thUser").
}