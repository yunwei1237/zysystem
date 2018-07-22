
let alertBox = "<div id='alertBox' class='am-modal am-modal-alert' tabindex='-1' style='z-index:1511;> <div class='am-modal-dialog'> <div class='am-modal-hd'>:title</div> <div class='am-modal-bd'> :content </div> <div class='am-modal-footer'> <span class='am-modal-btn'>确定</span> </div> </div></div>";
/**
 * 警告框
 * @param {Object} title
 * @param {Object} content
 */
$.alert = function(params){
	let title = params.title == null ? "系统提示" : params.title;
	let content = params.content == null ? "" : params.content;
	let box = $("#alertBox");
	if(box.length <=0 ){
		$("body").append(alertBox);
		box = $("#alertBox");
	}
	box.find(".am-modal-hd").html(title);
	box.find(".am-modal-bd").html(content);
	box.modal();
}
let confirmBox = "<div id='confirmBox' class='am-modal am-modal-confirm' tabindex='-1' style='z-index:1511;> <div class='am-modal-dialog'> <div class='am-modal-hd'>Amaze UI</div> <div class='am-modal-bd'> 你，确定要删除这条记录吗？ </div> <div class='am-modal-footer'> <span class='am-modal-btn' data-am-modal-cancel>取消</span> <span class='am-modal-btn' data-am-modal-confirm>确定</span> </div> </div> </div>";
/**
 * 确认框
 * @param {Object} title
 * @param {Object} content
 * @param {Object} confirmFun
 * @param {Object} cancelFun
 */
$.confirm = function(params){
	let title = params.title == null ? "系统提示" : params.title;
	let content = params.content == null ? "" : params.content;
	let confirmFun = params.confirmFun;
	let cancelFun = params.cancelFun;
	let box = $("#confirmBox");
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
let promptBox = "<div id='promptBox' class='am-modal am-modal-prompt' tabindex='-1' style='z-index:1511;> <div class='am-modal-dialog'> <div class='am-modal-hd'>Amaze UI</div> <div class='am-modal-bd'> <span>来来来，吐槽点啥吧 </span><input type='text' class='am-modal-prompt-input'> </div> <div class='am-modal-footer'> <span class='am-modal-btn' data-am-modal-cancel>取消</span> <span class='am-modal-btn' data-am-modal-confirm>提交</span> </div> </div> </div>";
/**
 * 输入窗口
 * @param title
 * @param content
 * @param okFun
 * @param noFun
 */
$.prompt = function(params){
	let title = params.title == null ? "系统提示" : params.title;
	let content = params.content == null ? "" : params.content;
	let okFun = params.okFun;
	let noFun = params.noFun;
	let box = $("#promptBox");
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

let popupBox = "<div class='am-popup' id='popupBox' style='z-index:1501;'> <div class='am-popup-inner'> <div class='am-popup-hd'> <h4 class='am-popup-title'>...</h4> <span data-am-modal-close class='am-close'>&times;</span> </div> <div class='am-popup-bd' style='padding:0px;'> ... </div> <div class='am-popup-footer am-text-right'></div></div> </div>";
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
	let box = $("#popupBox");
	if(box.length <=0 ){
		$("body").append(popupBox);
		box = $("#popupBox");
	}
	
	box.find(".am-popup-title").html(params.title==null?"系统提示":params.title);
	box.find(".am-popup-bd").empty().append(params.content);
	if(params.fun){
		params.fun(box.find(".am-popup-bd"));
	}
	if(params.buttons){
		let buttons = box.find(".am-popup-footer");
		buttons.empty();
		for(let key in params.buttons){
			let btn = $("<button type='button' class='am-btn am-btn-primary am-btn-sm' style='margin:5px;'>"+key+"</button>")
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
 * 	let names = ["a","b","c"];
 *  for(let i = 0;i<names.length;i++){
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
let popupListBox = "<div class='am-popup' id='popupListBox' style='z-index:1501;'> <div class='am-popup-inner'> <div class='am-popup-hd'> <h4 class='am-popup-title'>...</h4> <span data-am-modal-close class='am-close'>&times;</span> </div> <div class='am-popup-bd'  style='padding:0px;'> ... </div> <div class='am-popup-footer am-text-right'></div></div> </div>";
$.popupList = function(params){
	let box = $("#popupListBox");
	if(box.length <=0 ){
		$("body").append(popupListBox);
		box = $("#popupListBox");
	}
	
	box.find(".am-popup-title").html(params.title==null?"系统提示":params.title);
	let ul = $("<ul class='am-list am-list-border am-list-static' style='margin:0px 1px;'></ul>");
	let list = params.list;
	if(list != null){
		for(let i = 0;i<list.length;i++){
			ul.append("<li>"+list[0]+"</li>");
		}
	}
	let listFun = params.listFun;
	if(listFun != null){
		listFun(ul);
	}
	box.find(".am-popup-bd").empty().append(ul);
	if(params.buttons){
		let buttons = box.find(".am-popup-footer");
		buttons.empty();
		for(let key in params.buttons){
			let btn = $("<button type='button' class='am-btn am-btn-primary am-btn-sm' style='margin:5px;'>"+key+"</button>")
			btn.click(params.buttons[key]);
			buttons.append(btn);
		}
	}
	box.modal();
}

let popupTableBox = "<div class='am-popup' id='popupTableBox' style='z-index:1501;'> <div class='am-popup-inner'> <div class='am-popup-hd'> <h4 class='am-popup-title'>...</h4> <span data-am-modal-close class='am-close'>&times;</span> </div> <div class='am-popup-bd' style='padding:0px 1px;'> ... </div> <div class='am-popup-footer am-text-right'></div></div> </div>";
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
				alert("确定");f
			}
		}
	});
 * 
 * 
 * 
 * 
 */
$.popupTable = function(params){
	let box = $("#popupTableBox");
	if(box.length <=0 ){
		$("body").append(popupTableBox);
		box = $("#popupTableBox");
	}
	
	box.find(".am-popup-title").html(params.title==null?"系统提示":params.title);
	let headers = params.headers;
	let rows = params.rows;
	let table = $("<table class='am-table am-table-bordered' style='margin:0px 1px;'></table>");
	//表头
	let thead = $("<thead><tr></tr></thead>");
	for(let i = 0;i<headers.length;i++){
		thead.find("tr").append("<th>"+headers[i]+"</th>")
	}
	//表身体
	let tbody = $("<tbody></tbody>");
	for(let i = 0;i<rows.length;i++){
		let tr = $("<tr></tr>");
		for(let j = 0;j<rows[i].length;j++){
			tr.append("<td>"+rows[i][j]+"</td>");
		}
		tbody.append(tr);
	}
	table.append(thead);
	table.append(tbody);
	box.find(".am-popup-bd").empty().append(table);
	if(params.buttons){
		let buttons = box.find(".am-popup-footer");
		buttons.empty();
		for(let key in params.buttons){
			let btn = $("<button type='button' class='am-btn am-btn-primary am-btn-sm' style='margin:5px;'>"+key+"</button>")
			btn.click(params.buttons[key]);
			buttons.append(btn);
		}
	}
	box.modal();
}
let floatToolBarBox = "<div id='floatToolBarBox' style='position:absolute;height: 48px;z-index:1501;'></div>";
/**
 *  生成一个浮动的工具栏
 * @param top 0-100
 * @param left  0-100
 * @param right 0-100
 * @param bottom 0-100
 * @param direction horizontal(水平)|vertical(垂直)
 * @param buttons
 * 	如：[{title:""}]
 */
$.floatToolBar = function(params){
	let box = $("#floatToolBarBox");
	if(box.length <=0 ){
		$("body").append(floatToolBarBox);
		box = $("#floatToolBarBox");
	}
	if(params.direction == "vertical"){
		box.css({width:"48px"});
	}else{
		box.css({width:null});
	}
	let left = NumberUtils.clamp(params.left,0,100);
	let right = NumberUtils.clamp(params.right,0,100);
	let top = NumberUtils.clamp(params.top,0,100);
	let bottom = NumberUtils.clamp(params.bottom,0,100);

	if(left != null) {
		box.css({left: left + "%"});
	}else if(right != null){
		box.css({right:right+"%"});
	}

	if(top != null){
		box.css({top:top+"%"});
	}else if(bottom != null){
		box.css({bottom:bottom+"%"});
	}
	let buttons = params.buttons;
	if(buttons != null)
	for(let i in buttons){
		let btn = $(StringUtils.format("<a href='javascript:void(0);' title='%s' class='%s am-icon-btn' style='margin: 2px;'></a>",buttons[i].title,buttons[i].iconClass));
		btn.click(buttons[i].fun);
		box.append(btn);
	}
}
/**
 * 给指定的元素，添加指定的点击弹出警告窗口事件
 * @param params
 */
$.fn.alert = function(params){
	$(this).click(function(){
		$.alert(params);
	});
}
/**
 * 给指定的元素，添加指定的点击弹出警告确认框事件
 * @param params
 */
$.fn.confirm = function(params){
	$(this).click(function(){
		$.confirm(params);
	});
}
/**
 * 给指定的元素，添加指定的点击弹出提示输入框事件
 * @param params
 */
$.fn.prompt = function(params){
	$(this).click(function(){
		$.prompt(params);
	});
}
//试卷生成
/**
 * 将数据填充到列表中
 * @param questions  要显示的试题数组
 * @param buttons	每一个试题的操作按钮
 * @param selected  试题的选项是否是可以选择，每一个选项前加上复选框
 * @param showAnswer 是否显示答案
 * @param showTags 是否显示标签
 */
$.fn.fillQuestion = function(params){
	let questions = params.questions;
	let buttons = params.buttons;
	let ul = $("<ul class='am-list'></ul>");
    $(this).empty().append(ul);
    for(let i = 0;i<questions.length;i++){
        let question = questions[i];
        let li = $("<li class='am-padding-top-sm am-padding-left-sm am-padding-right-sm'></li>");
        li.append("<h3>"+(i+1)+".&nbsp;&nbsp;"+question.questionTitle+"</h3>");
        let options = [];
        options["A"] = question.optionA;
        options["B"] = question.optionB;
        options["C"] = question.optionC;
        options["D"] = question.optionD;
        options["E"] = question.optionE;
        options["F"] = question.optionF;
		for(let key in options){
			let option = options[key];
			if(option){
				if(params.selected){
					li.append(StringUtils.format("<p class='am-hover'><label for='%s' style='padding: 5px;margin: 0px;width: 100%;height: 100%'><input type='checkbox' name='%s' id='%s'/><strong>&nbsp;&nbsp;%s：</strong>%s</label></p>","question-"+question.id+"-"+key,"question-"+question.id,"question-"+question.id+"-"+key,key,option));
				}else{
                    li.append("<p><strong>"+key+":&nbsp;&nbsp;</strong>"+option+"</p>");
				}
			}
		}
		//
		if(params.showAnswer){
            li.append("<p><strong>答案:&nbsp;&nbsp;</strong>"+question.answer+"</p>");
            li.append("<p><strong>答案详解:&nbsp;&nbsp;</strong>"+question.answerDetail+"</p>");
		}

        if(buttons){
            let btns = $("<p class='am-text-right'></p>");
            for(let key in buttons){
                let btn = $("<button type='button' class='am-btn am-btn-primary am-btn-sm' style='margin:5px;'>"+key+"</button>")
                btn.click(buttons[key]);
                btns.append(btn);
            }
            li.append(btns);
        }
        if(params.showTags){
            let tags = $("<p class='am-text-right'></p>");
            let difficultyName = "";
            if(question.difficulty<=200){
                difficultyName = "新手";
            }else if(question.difficulty>200 && question.difficulty <=400){
                difficultyName = "熟手";
            }else if(question.difficulty>400 && question.difficulty <=600){
                difficultyName = "高手";
            }else if(question.difficulty>600 && question.difficulty <=800){
                difficultyName = "神手";
            }else if(question.difficulty>800){
                difficultyName = "圣手";
            }
            tags.append("<span class='am-badge am-radius' style='margin:2px;'>"+difficultyName+"</span>");
            tags.append("<span class='am-badge am-badge-warning am-radius' style='margin:2px;'>做错"+question.mistakes+"次</span>");
            tags.append("<span class='am-badge am-badge-success am-radius' style='margin:2px;'>正确率"+NumberUtils.toFixed((question.used-question.mistakes)/question.used*100)+"%</span>");
            tags.append("<span class='am-badge am-badge-secondary am-radius' style='margin:2px;'>共使用"+question.used+"次</span>");
            li.append(tags);
		}

        ul.append(li);
    }
}


//表单组件
$.form = {};
/**
 * 复选框组和单选框组
 * @param name 表单名
 * @param type checkbox|radio 默认单选框
 * @param data 数据
 * @param direction horizontal(水平)|vertical(垂直) 默认水平
 * @param className
 * @param style
 */
$.form.checkedGroup = function(params){
	let name = params.name;
	let type = params.type == null ? "radio":params.type;
	let data = params.data;
	let direction = params.direction;
	let className = params.className == null?"":params.className;
	let style = params.style == null?"":params.style;
	var boxGroup = "";
	for(let key in data){
		let id = type+"-"+key;
		boxGroup += StringUtils.format("<input id='%s' type='%s' class='%s' style='%s' name='%s' /><label for='%s'>%s</label>"
			,id,type,className,style,name,id,data[key]);
		if(direction == "vertical"){
			boxGroup+="<br >"
		}
	}
	return boxGroup;
}

/**
 * 下拉框
 * @param name 表单名
 * @param type checkbox|radio 默认单选框
 * @param data 数据
 * @param className 下拉框类
 * @param style 下拉框样式
 * @param itemClassName 子项类
 * @param itemStyle 子项样式
 */
$.form.select = function(params){
	let name = params.name;
	let type = params.type == null ? "radio":params.type;
	let data = params.data;
	let className = params.className == null?"":params.className;
	let style = params.style == null?"":params.style;
	let itemClassName = params.itemClassName == null?"":params.itemClassName;
	let itemStyle = params.itemStyle == null?"":params.itemStyle;
	let select = StringUtils.format("<select name='%s' class='%s' style='%s' >",name,className,style);
	for(let key in data){
		select += StringUtils.format("<option class='%s' style='%s' value='%s' >%s</option>",className,style,key,data[key]);
	}
	select += "</select>";
	return select;
}

$.form.seekBar = function(){
	let seekBar = $("<div class='seekBar' style='position: relative;height: 30px;'> <div class='line' style='position:absolute;border: 2px #c7c7c7 solid;width: 100%;margin: 5px 0px;top:50%;'></div> <div class='slider' style='position:absolute;width: 12px;height: 12px; border-radius: 50%;border:1px #CCC solid;background: #fff;top:50%;left: 50px;'> <span class='label' style='position: relative;font-size: 10px;top:-22px;left:-2px;color: #5c5c5c;'>22</span> </div> </div>");

}