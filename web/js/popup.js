

function reportPostShow(){
	$('#reportPost').show();
}

function reportPostHide(){
	$('#reportPost').hide();
}

function notionLogin() {

	$('#loginNotion').show();
	return false;

	return true;

}

function popupHide() {
	$('#image_upload').hide();
	$('#loginNotion').hide();
}

function setBoardIdAndTitle() {
	var boardSelected = $('.boardOption:selected');
	var titleInput = $("#titleInput");
	var loadForm = $("#uploadForm");

	if (titleInput.val() == null || titleInput.val() == "") {
		alert('请输入图片的描述')
		return false;
	} else {
		var boardId = boardSelected.val()
		var title = titleInput.val()
		loadForm.attr("action", "photoNote?type=addPhoteNote&boardId="
				+ boardId + "&title=" + title)
		return true;
	}
}
