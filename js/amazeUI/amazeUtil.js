
var alertBox = "<div id='alertBox' class='am-modal am-modal-alert' tabindex='-1' id='my-alert'> <div class='am-modal-dialog'> <div class='am-modal-hd'>:title</div> <div class='am-modal-bd'> :content </div> <div class='am-modal-footer'> <span class='am-modal-btn'>确定</span> </div> </div></div>";
/**
 * 警告框
 * @param {Object} title
 * @param {Object} content
 */
$.alert = function(title,content){
	var box = $("#alertBox");
	if(box.length <=0 ){
		$("body").append(alertBox);
		box = $("#alertBox");
	}
	box.find(".am-modal-hd").html(title);
	box.find(".am-modal-bd").html(content);
	box.modal();
}
var confirmBox = "<div id='confirmBox' class='am-modal am-modal-confirm' tabindex='-1'> <div class='am-modal-dialog'> <div class='am-modal-hd'>Amaze UI</div> <div class='am-modal-bd'> 你，确定要删除这条记录吗？ </div> <div class='am-modal-footer'> <span class='am-modal-btn' data-am-modal-cancel>取消</span> <span class='am-modal-btn' data-am-modal-confirm>确定</span> </div> </div> </div>";
/**
 * 确认框
 * @param {Object} title
 * @param {Object} content
 * @param {Object} confirmFun
 * @param {Object} cancelFun
 */
$.confirm = function(title,content,confirmFun,cancelFun){
	var box = $("#confirmBox");
	if(box.length <=0 ){
		$("body").append(confirmBox);
		box = $("#confirmBox");
	}
	box.find(".am-modal-hd").html(title);
	box.find(".am-modal-bd").html(content);
	box.modal({
		onConfirm: function(options) {
			if(confirmFun) {
				confirmFun();
			}
		},
		onCancel: function() {
			if(cancelFun) {
				cancelFun();
			}
		}
	});
}
var promptBox = "<div id='promptBox' class='am-modal am-modal-prompt' tabindex='-1'> <div class='am-modal-dialog'> <div class='am-modal-hd'>Amaze UI</div> <div class='am-modal-bd'> <span>来来来，吐槽点啥吧 </span><input type='text' class='am-modal-prompt-input'> </div> <div class='am-modal-footer'> <span class='am-modal-btn' data-am-modal-cancel>取消</span> <span class='am-modal-btn' data-am-modal-confirm>提交</span> </div> </div> </div>";
$.prompt = function(title,content,okFun,noFun){
	var box = $("#promptBox");
	if(box.length <=0 ){
		$("body").append(promptBox);
		box = $("#promptBox");
	}
	box.find(".am-modal-hd").html(title);
	box.find(".am-modal-bd>span").html(content);
	box.modal({
		onConfirm: function(e) {
			if(okFun) {
				okFun(e.data);
			}
		},
		onCancel: function() {
			if(noFun) {
				noFun();
			}
		}
	});
}

var popupBox = "<div class='am-popup' id='popupBox' style='z-index:1501;'> <div class='am-popup-inner'> <div class='am-popup-hd'> <h4 class='am-popup-title'>...</h4> <span data-am-modal-close class='am-close'>&times;</span> </div> <div class='am-popup-bd'> ... </div> <div class='am-popup-footer am-text-right'></div></div> </div>";
/**
 * 弹出容器，显示信息
 * @param {Object} params
 * params.title:标题，默认，系统提示
 * params.content:内容
 * params.buttons:代表按钮的数组，数组中每一个对象都是名字和函数组成，如：
 * [
 * 	{
 * 		"删除":function(){
 * 			alert("删除成功");
 * 		}
 * 	},
 * 	{
 * 		"取消":function(){
 * 			alert("已经取消");
 * 		}
 * 	}
 * 	}
 * ]
 * 
 * 例子：
 * $.popup({
		title:"系统提示",
		content:"您选择6道题",
		buttons:{
			"删除":function(){
				alert("删除");
			},
			"确定":function(){
				alert("确定");
			}
		}
	});
 */
$.popup = function(params){
	var box = $("#popupBox");
	if(box.length <=0 ){
		$("body").append(popupBox);
		box = $("#popupBox");
	}
	
	box.find(".am-popup-title").html(params.title==null?"系统提示":params.title);
	box.find(".am-popup-bd").html(params.content);
	if(params.buttons){
		var buttons = box.find(".am-popup-footer");
		buttons.empty();
		for(var key in params.buttons){
			var btn = $("<button type='button' class='am-btn am-btn-primary am-btn-sm' style='margin:5px;'>"+key+"</button>")
			btn.click(params.buttons[key]);
			buttons.append(btn);
		}
	}
	box.modal();
}
/**
 * 弹出容器，使用列表显示信息
 * @param {Object} params
 * params.title:标题，默认，系统提示
 * params.list:要显示的数组数据
 * params.listFun:使用函数来填充数据，
 * 如：
 * function(list){
 * 	var names = ["a","b","c"];
 *  for(var i = 0;i<names.length;i++){
 * 		list.append("<li>"+names[i]+"</li>");
 * 	}
 * }
 * params.buttons:代表按钮的数组，数组中每一个对象都是名字和函数组成，如：
 * [
 * 	{
 * 		"删除":function(){
 * 			alert("删除成功");
 * 		}
 * 	},
 * 	{
 * 		"取消":function(){
 * 			alert("已经取消");
 * 		}
 * 	}
 * 	}
 * ]
 * 
 * 例子：
 * $.popupList({
		title:"系统提示",
		list:["aaaa","bbb","cccc"],
		buttons:{
			"删除":function(){
				alert("删除");
			},
			"确定":function(){
				alert("确定");
			}
		}
	});
 * 
 */
var popupListBox = "<div class='am-popup' id='popupListBox' style='z-index:1501;'> <div class='am-popup-inner'> <div class='am-popup-hd'> <h4 class='am-popup-title'>...</h4> <span data-am-modal-close class='am-close'>&times;</span> </div> <div class='am-popup-bd'  style='padding:0px;'> ... </div> <div class='am-popup-footer am-text-right'></div></div> </div>";
$.popupList = function(params){
	var box = $("#popupListBox");
	if(box.length <=0 ){
		$("body").append(popupListBox);
		box = $("#popupListBox");
	}
	
	box.find(".am-popup-title").html(params.title==null?"系统提示":params.title);
	var ul = $("<ul class='am-list am-list-border am-list-static' style='margin:0px 1px;'></ul>");
	var list = params.list;
	if(list != null){
		for(var i = 0;i<list.length;i++){
			ul.append("<li>"+list[0]+"</li>");
		}
	}
	var listFun = params.listFun;
	if(listFun != null){
		listFun(ul);
	}
	box.find(".am-popup-bd").empty().append(ul);
	if(params.buttons){
		var buttons = box.find(".am-popup-footer");
		buttons.empty();
		for(var key in params.buttons){
			var btn = $("<button type='button' class='am-btn am-btn-primary am-btn-sm' style='margin:5px;'>"+key+"</button>")
			btn.click(params.buttons[key]);
			buttons.append(btn);
		}
	}
	box.modal();
}

var popupTableBox = "<div class='am-popup' id='popupTableBox' style='z-index:1501;'> <div class='am-popup-inner'> <div class='am-popup-hd'> <h4 class='am-popup-title'>...</h4> <span data-am-modal-close class='am-close'>&times;</span> </div> <div class='am-popup-bd' style='padding:0px 1px;'> ... </div> <div class='am-popup-footer am-text-right'></div></div> </div>";
/**
 * 弹出容器，使用表格显示信息
 * @param {Object} params
 * params.title:标题，默认，系统提示
 * params.headers:表格标题，一维数组
 * params.rows:表格中的每一行数据，类型是二维数组
 * params.buttons:代表按钮的数组，数组中每一个对象都是名字和函数组成，如：
 * [
 * 	{
 * 		"删除":function(){
 * 			alert("删除成功");
 * 		}
 * 	},
 * 	{
 * 		"取消":function(){
 * 			alert("已经取消");
 * 		}
 * 	}
 * 	}
 * ]
 * 
 * 
 * 例子：
 * $.popupTable({
		title:"系统提示",
		headers:["编号","姓名","成绩"],
		rows:[
			[1,"张三",87],
			[2,"李四",87],
			[3,"王五",87],
			[4,"赵七",87],
		],
		buttons:{
			"删除":function(){
				alert("删除");
			},
			"确定":function(){
				alert("确定");
			}
		}
	});
 * 
 * 
 * 
 * 
 */
$.popupTable = function(params){
	var box = $("#popupTableBox");
	if(box.length <=0 ){
		$("body").append(popupTableBox);
		box = $("#popupTableBox");
	}
	
	box.find(".am-popup-title").html(params.title==null?"系统提示":params.title);
	var headers = params.headers;
	var rows = params.rows;
	var table = $("<table class='am-table am-table-bordered' style='margin:0px 1px;'></table>");
	//表头
	var thead = $("<thead><tr></tr></thead>");
	for(var i = 0;i<headers.length;i++){
		thead.find("tr").append("<th>"+headers[i]+"</th>")
	}
	//表身体
	var tbody = $("<tbody></tbody>");
	for(var i = 0;i<rows.length;i++){
		var tr = $("<tr></tr>");
		for(var j = 0;j<rows[i].length;j++){
			tr.append("<td>"+rows[i][j]+"</td>");
		}
		tbody.append(tr);
	}
	table.append(thead);
	table.append(tbody);
	box.find(".am-popup-bd").empty().append(table);
	if(params.buttons){
		var buttons = box.find(".am-popup-footer");
		buttons.empty();
		for(var key in params.buttons){
			var btn = $("<button type='button' class='am-btn am-btn-primary am-btn-sm' style='margin:5px;'>"+key+"</button>")
			btn.click(params.buttons[key]);
			buttons.append(btn);
		}
	}
	box.modal();
}