/**
 * 常用工具类
 *
 */
var ValidateUtils = {};
ValidateUtils.title = "系统提示";

ValidateUtils.isArray = function(obj,msg){
    if(typeof obj == 'object' && obj.length != null){
        if(msg == null)
            throw ValidateUtils.title+"：对象是数组";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNotArray = function(obj,msg){
    if(typeof obj != 'object' || obj.length == null){
        if(msg == null)
            throw ValidateUtils.title+"：对象不是数组";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNumber = function(obj,msg){
    if(!isNaN(obj)){
        if(msg == null)
            throw ValidateUtils.title+"：对象是数字";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNotNumber = function(obj,msg){
    if(isNaN(obj)){
        if(msg == null)
            throw ValidateUtils.title+"：对象不是数字";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNull = function(obj,msg){
    if(obj == null){
        if(msg == null)
            throw ValidateUtils.title+"：对象为null";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNotNull = function(obj,msg){
    if(obj != null){
        if(msg == null)
            throw ValidateUtils.title+"：对象不为null";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isEmpty = function(obj,msg){
    var type = typeof obj;
    if(obj.trim() == ""){
        if(msg == null)
            throw ValidateUtils.title+"：字符串必须为空";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNotEmpty = function(obj,msg){
    var type = typeof obj;
    if(obj.trim() != ""){
        if(msg == null)
            throw ValidateUtils.title+"：字符串不能为空";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isBlank = function(obj){
    var type = typeof obj;
    if(obj.trim() == "" || obj.trim() == null){
        if(msg == null)
            throw ValidateUtils.title+"：对象为空或为null";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNotBlank = function(obj){
    var type = typeof obj;
    if(obj.trim() != "" && obj.trim() != null){
        if(msg == null)
            throw ValidateUtils.title+"：对象不为空或不为null";
        else
            throw ValidateUtils.title+"："+msg;
    }
}

var ArrayUtils = {};
/**
 * 从一个数组中获得 一个子数组
 * @param {Object} arr
 * @param {Object} star
 * @param {Object} end
 */
ArrayUtils.subArray = function(arr,start,end){
    ValidateUtils.isNull(arr);//验证是否为空
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
/**
 * 克隆数组
 * @param {Object} arr
 */
ArrayUtils.clone = function(arr){
    return ArrayUtils.subArray(arr,0);
}
/**
 *
 * @param {Object} arr
 * @param {Object} index
 * @param {Object} item
 */
ArrayUtils.insert = function(arr,index,item){
    var targetArray = ArrayUtils.clone(arr);
    for(var i = index;i<arr.length;i++){
        targetArray[i+1] = arr[i];
    }
    targetArray[index] = item;
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
        result = StringUtils.replace(result,index,index+replaces[i].length,thing);
    }
    return result;
}
StringUtils.concat = function(){
    var str = "";
    for(var i = 0;i<arguments.length;i++){
        str += arguments[i];
    }
    return str;
}
StringUtils.prefix = function(str,prefix){
    return StringUtils.concat(prefix,obj);
}
StringUtils.suffix = function(str,suffix){
    return StringUtils.concat(obj,suffix);
}
/**
 * 获得字符串左边多少个字符
 * @param {Object} str
 * @param {Object} count
 */
StringUtils.left = function(str,count){
    return str.substr(0,count);
}
/**
 * 获得字符串右边多少个字符
 * @param {Object} str
 * @param {Object} count
 */
StringUtils.right = function(str,count){
    return str.substring(str.length-count);
}
/**
 * 获得字符串中间的字符
 * @param {Object} str
 * @param {Object} start
 * @param {Object} end
 */
StringUtils.center = function(str,start,end){
    return str.slice(start,end);
}
/**
 * 将一个字符重复多少次
 * @param {Object} str
 * @param {Object} count
 */
StringUtils.repeat = function(str,count){
    var result = "";
    for(var i = 0;i<count;i++){
        result += str;
    }
    return result;
}
/**
 * 左对齐填充字符
 * @param {Object} str
 * @param {Object} count
 * @param {Object} char
 */
StringUtils.alignLeft = function(str,count,char){
    if(count>str.length){
        return str+StringUtils.repeat(char,count-str.length);
    }else{
        return str.substr(0,count);
    }
}
/**
 * 右对齐填充字符
 * @param {Object} str
 * @param {Object} count
 * @param {Object} char
 */
StringUtils.alignRight = function(str,count,char){
    if(count>str.length){
        return StringUtils.repeat(char,count-str.length)+str;
    }else{
        return str.substring(str.length-count);
    }
}
/**
 * 居中对齐填充字符
 * @param {Object} str
 * @param {Object} count
 * @param {Object} char
 */
StringUtils.alignCenter = function(str,count,char){
    var left = (count-str.length)/2;
    var right = (count-str.length)-left;
    return StringUtils.repeat(char,left)+str+StringUtils.repeat(char,right);
}
/**
 * 太长的文字进行缩略
 * @param {Object} str
 * @param {Object} count
 * @param {Object} char
 */
StringUtils.ellipsis = function(str,count){
    count = count<str.length?count:str.length;//count太大时，使用字符串的长度
    return str.slice(0,count)+"...";
}
/**
 * 检测字符串中是否包含其它字符串
 * @param {Object} str
 * @param {Object} find
 */
StringUtils.containt = function(str,find){
    return str.indexOf(find)>-1;
}
/**
 * 格式化字符串，类似java中String.format()方法
 * @param {Object} params
 */
StringUtils.format = function(){
    var reg = /%[-+]?([0 ,)]?)(\d+(\.\d+)?)?[dsfbxo%]/img;
    var str = arguments[0];
    var items = ArrayUtils.subArray(arguments,1);
    var replaces = str.match(reg);
    ValidateUtils.isNull(replaces,str+"中的格式字符串不正确");
    var formats = {
        "d":function(replace,item){
            var reg = /%(([-+]?)([0 ,)]?)(\d+))?d/i;
            var match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            var params = match[1];
            if(params != null){
                var align = match[2];
                var fill = "";
                if(StringUtils.containt(",)",match[3])){
                    if(match[3] == ","){
                        item = NumberUtils.toStringSeparator(item);
                    }else if(match[3] == ")"){
                        item = StringUtils.concat("(",item,")");
                    }
                }else{
                    fill = match[3] == "" ? " " : match[3];//数字前面要填充的符号,默认空格
                }
                var len = parseInt(match[4]);//数字共占多少字符
                if(new String(item).length<len){
                    if(align == "-")
                        return StringUtils.alignLeft(new String(item),len,fill);
                    else
                        return StringUtils.alignRight(new String(item),len,fill);
                }
            }
            return item;
        },
        "s":function(replace,item){
            var reg = /%(([-+]?)(\d+))?s/i;
            var match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            var params = match[1];
            if(params != null){
                var align = match[2];
                var fill = " ";//数字前面要填充的符号,默认空格
                var len = parseInt(match[3]);//数字共占多少字符
                if(new String(item).length<len){
                    if(align == "-")
                        return StringUtils.alignLeft(new String(item),len,fill);
                    else
                        return StringUtils.alignRight(new String(item),len,fill);
                }
            }
            return item;
        },
        "f":function(replace,item){
            var reg = /%(([,)]?)((\d+(\.\d+)?)))?f/i;
            var match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            var params = match[1];
            if(params != null){
                var fill = "0";
                var num = new String(item).split(".");
                var intNum = num[0];
                var floatNum = num[1];
                var intFloat = match[4].split(".");//计算整数和小数部分
                var intLen = intFloat[0];
                var floatLen = intFloat[1];
                //将整数位扩展到指定长度
                if(intLen != null && intNum != null){
                    intNum = StringUtils.alignRight(new String(intNum),parseInt(intLen),fill);
                }
                //将小数位扩展到指定长度
                if(floatLen != null){
                    if(floatNum != null){
                        floatNum = StringUtils.alignLeft(new String(floatNum==null?"":floatNum),parseInt(floatLen),fill);
                    }else{
                        floatNum = StringUtils.repeat(fill,floatLen);
                    }
                }
                //是否要格式化
                if(StringUtils.containt(",)",match[2])){
                    if(match[2] == ","){
                        return StringUtils.concat(NumberUtils.toStringSeparator(intNum),".",floatNum) ;
                    }else if(match[2] == ")"){
                        return StringUtils.concat("(",intNum,".",floatNum,")");
                    }
                }
                //不需要格式化
                return StringUtils.concat(intNum,".",floatNum);
            }
            return item;
        },
        "%":function(replace,item){
            var reg = /%(([,)]?)((\d+(\.\d+)?)))?%/i;
            var match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            var params = match[1];
            if(params != null){
                var fill = "0";
                var num = new String(item).split(".");
                var intNum = num[0];
                var floatNum = num[1];
                var intFloat = match[4].split(".");//计算整数和小数部分
                var intLen = intFloat[0];
                var floatLen = intFloat[1];
                //将整数位扩展到指定长度
                if(intLen != null && intNum != null){
                    intNum = StringUtils.alignRight(new String(intNum),parseInt(intLen),fill);
                }
                //将小数位扩展到指定长度
                if(floatLen != null){
                    if(floatNum != null){
                        floatNum = StringUtils.alignLeft(new String(floatNum==null?"":floatNum),parseInt(floatLen),fill);
                    }else{
                        floatNum = StringUtils.repeat(fill,floatLen);
                    }
                }
                //是否要格式化
                if(StringUtils.containt(",)",match[2])){
                    if(match[2] == ","){
                        return StringUtils.concat(NumberUtils.toStringSeparator(intNum),".",floatNum);
                    }else if(match[2] == ")"){
                        return StringUtils.concat("(",intNum,".",floatNum,")");
                    }
                }
                //不需要格式化
                return StringUtils.concat(intNum,".",floatNum);
            }
            return item;
        },
        "b":function(replace,item){
            var reg = /%(\d+)?b/i;
            var match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            var params = match[1];
            if(params != null){
                var fill = "0";
                var len = parseInt(match[1]);//数字共占多少字符
                return StringUtils.alignRight(new Number(new String(item)).toString(2),len,fill);
            }
            return new Number(new String(item)).toString(2);
        },
        "o":function(replace,item){
            var reg = /%(\d+)?o/i;
            var match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            var params = match[1];
            if(params != null){
                var fill = "0";
                var len = parseInt(match[1]);//数字共占多少字符
                return StringUtils.alignRight(new Number(new String(item)).toString(8),len,fill);
            }
            return new Number(new String(item)).toString(8);
        },
        "x":function(replace,item){
            var reg = /%(\d+)?x/i;
            var match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            var params = match[1];
            if(params != null){
                var fill = "0";
                var len = parseInt(match[1]);//数字共占多少字符
                return StringUtils.alignRight(new Number(new String(item)).toString(16),len,fill);
            }
            return new Number(new String(item)).toString(16);
        }
    };

    return StringUtils.replaces(str,replaces,items,function(replace,item){
        var format = formats[StringUtils.right(replace,1)];
        ValidateUtils.isNull(format,replace+"格式不被支持，请确认是否有误");
        return format(replace,item);
    });
}
var NumberUtils = {};
/**
 * 保存小数位数
 * @param {Object} obj
 * @param {Object} fixed
 */
NumberUtils.toFixed = function(obj,fixed){
    ValidateUtils.isNotNumber(obj,obj+"不是数字类型，无法保存小数位数");
    var num = null;
    if(typeof obj == "string"){
        num = parseFloat(obj);
    }else{
        num = obj;
    }
    fixed = fixed == null ? 2 : fixed;
    return new Number(num).toFixed(fixed);
}

/**
 * 将数字转换成有分隔符形式的字符串
 * NumberUtils.toStringSeparator("12345");  == "12,345"
 * @param {Object} obj
 */
NumberUtils.toStringSeparator = function(obj){
    ValidateUtils.isNotNumber(obj,obj+"不是数字类型，无法转换成有分隔符的形式");
    var zeroNum = NumberUtils.countZero(obj);//计算数字前面有多少0
    var chars = new String(parseInt(obj)).split("");//去掉数字前面的0
    for(var i = chars.length-3;i>0;i-=3){
        chars = ArrayUtils.insert(chars,i,",");
    }
    return StringUtils.concat(StringUtils.repeat("0",zeroNum),chars.join(""));
}
/**
 * 计算
 * @param {Object} obj
 */
NumberUtils.countZero = function(obj){
    if(typeof obj == 'number'){
        return 0;
    }
    return obj.length - new String(parseInt(obj)).length;
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
