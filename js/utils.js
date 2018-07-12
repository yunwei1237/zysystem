/**
 * 常用工具类
 *
 */
var ValidateUtils = {};
ValidateUtils.title = "系统提示";
ValidateUtils.isNull = function(obj){
	if(obj != null){
		throw ValidateUtils.title+"：对象必须为null";
	}
	return true;
}
ValidateUtils.isNotNull = function(obj){
	if(obj == null){
		throw ValidateUtils.title+"：对象不能为null";
	}
	return true;
}
ValidateUtils.isEmpty = function(obj){
	var type = typeof obj;
	if(obj.trim() != ""){
		throw ValidateUtils.title+"：字符串必须为空";
	}
	return true;
}
ValidateUtils.isNotEmpty = function(obj){
	var type = typeof obj;
	if(obj.trim() == ""){
		throw ValidateUtils.title+"：字符串不能为空";
	}
	return true;
}
ValidateUtils.isBlank = function(obj){
	var type = typeof obj;
	if(ValidateUtils.isNotEmpty(obj) && ValidateUtils.isNotNull(obj)){
		throw ValidateUtils.title+"：对象必须为空";
	}
	return true;
}
ValidateUtils.isNotBlank = function(obj){
	var type = typeof obj;
	if(ValidateUtils.isEmpty(obj) && ValidateUtils.isNull(obj)){
		throw ValidateUtils.title+"：对象不能为空";
	}
	return true;
}

var ArrayUtils = {};
/**
 * 从一个数组中获得 一个子数组
 * @param {Object} arr
 * @param {Object} star
 * @param {Object} end
 */
ArrayUtils.subArray = function(arr,start,end){
	ValidateUtils.isNotNull(arr);//验证是否为空
	if(typeof arr != "object" || arr.length == null){
		throw "系统提示：必须为数组对象";
	}
	var targetArray = [];
	if(start >= arr.length){
		throw "系统提示：开始的下标超出数组的长度";
	}
	if(end == null){
		end = arr.length-1;
	}
	for(var i = start;i<=end;i++){
		targetArray.push(arr[i]);
	}
	return targetArray;
}
var StringUtils = {};
/**
 * 将str字符串中从start开始到end(不包含)结束位置的内容替换成fill
 * @param {Object} str
 * @param {Object} start
 * @param {Object} end
 * @param {Object} fill
 */
StringUtils.replace = function(str,start,end,fill){
	var left = str.substring(0,start);
	var right = str.substring(end);
	return left+fill+right;
}
/**
 * 将字符串str中的字符集合replaces,替换成字符串集合things,如果提供fun,可以将要替换的字符串作修改.
 * @param {Object} str
 * @param {Object} replaces 将要被替换的字符串集合,
 * @param {Object} things 将要替补的字符串集合
 * @param {Object} fun 可选
 */
StringUtils.replaces = function(str,replaces,things,fun){
	if(replaces.length != things.length){
		throw "系统提示：要替换的内容的数量和被替换内容的数量不一致";
	}
	var result = str;
	for(var i = 0;i<replaces.length;i++){
		var index = result.indexOf(replaces[i]);
		var thing = things[i];
		if(fun != null)
			thing = fun(replaces[i],things[i]);
		result = StringUtils.replace(result,index,index+2,thing);
	}
	return result;
}
StringUtils.left = function(str,count){
	return str.substr(0,count);
}
StringUtils.right = function(str,count){
	return str.substring(str.length-count);
}
StringUtils.center = function(str,start,end){
	return str.slice(start,end);
}
/**
 * 格式化字符串，类似java中String.format()方法
 * @param {Object} params
 */
StringUtils.format = function(){
	var reg = /%[-+]?(\d+(\.\d+)?)?[dsf]/img;
	var str = arguments[0];
	var items = ArrayUtils.subArray(arguments,1);
	var replaces = str.match(reg);
	function format(replace,item){
		var result = null;
		switch (StringUtils.right(replace,1)){
			case "s":
				result = item;
				break;
			case "d":
				result = item;
				break;
			case "f":
				result = item;
				break;
			default:
				break;
		}
		return result;
	}
	return StringUtils.replaces(str,replaces,items,format);
}
var NumberUtils = {};
/**
 * 保存小数位数
 */
NumberUtils.toString = function(obj,fixed){
	if(!isNaN(obj)){
		var num = null;
		if(typeof obj == "string"){
			num = parseFloat(obj);
		}else{
			num = obj;
		}
		fixed = fixed == null ? 2 : fixed;
		return new Number(num).toFixed(fixed);
	}
	throw obj+"不是数字类型，无法保存小数位数！！！";
}
var RandomUtils = {};
/**
 * 获得随机数
 * @param {Object} start 开始
 * @param {Object} end 结束（不包含）
 */
RandomUtils.random = function(start,end){
	return Math.floor(Math.random()*(end-start))+start;
}
var DateUtils = {};
