/**
 * 常用工具类
 *
 */
let ValidateUtils = {};
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
    let type = typeof obj;
    if(obj.trim() == ""){
        if(msg == null)
            throw ValidateUtils.title+"：字符串必须为空";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNotEmpty = function(obj,msg){
    let type = typeof obj;
    if(obj.trim() != ""){
        if(msg == null)
            throw ValidateUtils.title+"：字符串不能为空";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isBlank = function(obj){
    let type = typeof obj;
    if(obj.trim() == "" || obj.trim() == null){
        if(msg == null)
            throw ValidateUtils.title+"：对象为空或为null";
        else
            throw ValidateUtils.title+"："+msg;
    }
}
ValidateUtils.isNotBlank = function(obj){
    let type = typeof obj;
    if(obj.trim() != "" && obj.trim() != null){
        if(msg == null)
            throw ValidateUtils.title+"：对象不为空或不为null";
        else
            throw ValidateUtils.title+"："+msg;
    }
}

let ArrayUtils = {};
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
    let targetArray = [];
    if(start >= arr.length){
        throw "系统提示：开始的下标超出数组的长度";
    }
    if(end == null){
        end = arr.length-1;
    }
    for(let i = start;i<=end;i++){
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
    let targetArray = ArrayUtils.clone(arr);
    for(let i = index;i<arr.length;i++){
        targetArray[i+1] = arr[i];
    }
    targetArray[index] = item;
    return targetArray;
}
let StringUtils = {};
/**
 * 将str字符串中从start开始到end(不包含)结束位置的内容替换成fill
 * @param {Object} str
 * @param {Object} start
 * @param {Object} end
 * @param {Object} fill
 */
StringUtils.replace = function(str,start,end,fill){
    let left = str.substring(0,start);
    let right = str.substring(end);
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
    let result = str;
    for(let i = 0;i<replaces.length;i++){
        let index = result.indexOf(replaces[i]);
        let thing = things[i];
        if(fun != null)
            thing = fun(replaces[i],things[i]);
        result = StringUtils.replace(result,index,index+replaces[i].length,thing);
    }
    return result;
}
StringUtils.concat = function(){
    let str = "";
    for(let i = 0;i<arguments.length;i++){
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
    let result = "";
    for(let i = 0;i<count;i++){
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
    let left = (count-str.length)/2;
    let right = (count-str.length)-left;
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
    if(find == "" || find == null){
        return false;
    }
    return str.indexOf(find)>-1;
}
/**
 * 格式化字符串，类似java中String.format()方法
 * 1.格式化数字:
 * StringUtils.format("年龄:%d",22);          == 年龄:22
 * StringUtils.format("月份:%2d",9);          == 月份: 9
 * StringUtils.format("月份:%02d",9);         == 月份:09
 * StringUtils.format("月份:%)2d",9);         == 月份:(9)
 * StringUtils.format("数量:%,2d",12345678);  == 数量:12,345,678
 * StringUtils.format("数量:%2d",1234);       == 数量:1234
 * StringUtils.format("数量:%7d",1234);       == 数量:   1234
 * StringUtils.format("数量:%07d",1234);      == 数量:0001234
 * StringUtils.format("数量:%d","abc");       == Uncaught 系统提示：abc不是数字
 *
 * 2.格式化字符串
 * StringUtils.format("姓名:%s","abc");       == "姓名:abc"
 * StringUtils.format("姓名:%7s","abc");      == "姓名:    abc"
 * StringUtils.format("姓名:%+7s","abc");     == "姓名:    abc"
 * StringUtils.format("姓名:%-7s","abc");     == "姓名:abc    "
 *
 * 3.格式化符点数
 * StringUtils.format("%f",12345.6789);       == "12345.6789"
 * StringUtils.format("%2.2f",12345.6789);    == "12345.67"
 * StringUtils.format("%7.2f",12345.6789);    == "0012345.67"   //%7.2f：代表整数保留7位，小数位数保留2位
 * StringUtils.format("%,f",12345.6789);      == "12,345.6789"
 * StringUtils.format("%,7.2f",12345.6789);   == "0012,345.67"
 * StringUtils.format("%)7.2f",12345.6789);   == "(0012345.67)"
 * StringUtils.format("%d","abc");            == Uncaught 系统提示：abc不是数字
 *
 * 3.格式化百分比
 * StringUtils.format("%%",0.123456);         == "12.3456%"
 * StringUtils.format("%1.2%",0.123456);      == "12.34%"
 * StringUtils.format("%7.2%",0.123456);      == "0000012.34%"
 * StringUtils.format("%,%",12.345678);       == "1,234.5678%"
 * StringUtils.format("%,7.2%",12.345678);    == "0001,234.56%"
 * StringUtils.format("%)7.2%",12.345678);    == "(0001234.56%)"
 * StringUtils.format("%%","abc");            == Uncaught 系统提示：abc不是数字
 *
 * 4.格式化货币
 * StringUtils.format("%m",1234.5678);        == "¥1234.56"
 * StringUtils.format("%,m",1234.5678);       == "¥1,234.56"
 * StringUtils.format("%2m",1234.5678);       == "$1234.56"
 * StringUtils.format("%,2m",1234.5678);      == "$1,234.56"
 *
 * 5.格式化二进制
 * StringUtils.format("%b",10);               == "1010"
 * StringUtils.format("%8b",10);              == "00001010"
 * StringUtils.format("%1b",10);              == "00001010"
 *
 * 6.格式化八进制
 * StringUtils.format("%o",10);               == "12"
 * StringUtils.format("%8o",10);              == "00000012"
 * StringUtils.format("%1o",10);              == "12"
 *
 * 7.格式化十六进制
 * StringUtils.format("%x",17);               == "11"
 * StringUtils.format("%8x",17);              == "00000011"
 * StringUtils.format("%1x",17);              == "11"
 *
 */
StringUtils.format = function(){
    let reg = /%[-+]?([0 ,)]?)(\d+(\.\d+)?)?[dsfbxo%m]/img;
    let str = arguments[0];
    let items = ArrayUtils.subArray(arguments,1);
    let replaces = str.match(reg);
    ValidateUtils.isNull(replaces,str+"中的格式字符串不正确");
    let formats = {
        "d":function(replace,item){
            let reg = /%(([0 ,)]?)(\d+))?d/i;
            let match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            ValidateUtils.isNotNumber(item,item+"不是数字");
            let params = match[1];
            if(params != null){
                let align = match[2];
                let fill = "";
                if(StringUtils.containt(",) ",match[2])){
                    if(match[2] == ","){
                        item = NumberUtils.toStringSeparator(item);
                    }else if(match[2] == ")"){
                        item = StringUtils.concat("(",item,")");
                    }
                }else{
                    fill = match[2] == "" ? " " : match[2];//数字前面要填充的符号,默认空格
                }
                let len = parseInt(match[3]);//数字共占多少字符
                if(new String(item).length < len){//如果指定长度大于数字长度就补位
                    return StringUtils.alignRight(new String(item),len,fill);
                }
            }
            return item;
        },
        "s":function(replace,item){
            let reg = /%(([-+]?)(\d+))?s/i;
            let match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            let params = match[1];
            if(params != null){
                let align = match[2];
                let fill = " ";//数字前面要填充的符号,默认空格
                let len = parseInt(match[3]);//数字共占多少字符
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
            let reg = /%(([,)]?)((\d+(\.\d+)?)?))?f/i;
            let match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            ValidateUtils.isNotNumber(item,item+"不是数字");
            let params = match[1];
            if(params != null){
                let fill = "0";
                let num = new String(item).split(".");
                let intNum = num[0];
                let floatNum = num[1];
                if(match[4]){
                    let intFloat = match[4].split(".");//计算整数和小数部分
                    let intLen = intFloat[0];
                    let floatLen = intFloat[1];
                    //将整数位扩展到指定长度
                    if(intLen != null && intNum != null){
                        if(new String(intNum).length < parseInt(intLen)){
                            intNum = StringUtils.alignRight(new String(intNum),parseInt(intLen),fill);
                        }else{
                            intNum = new String(intNum);
                        }

                    }
                    //将小数位扩展到指定长度
                    if(floatLen != null){
                        if(floatNum != null){
                            floatNum = StringUtils.alignLeft(new String(floatNum==null?"":floatNum),parseInt(floatLen),fill);
                        }else{
                            floatNum = StringUtils.repeat(fill,floatLen);
                        }
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
            let reg = /%(([,)]?)((\d+(\.\d+)?)?))?%/i;
            let match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            ValidateUtils.isNotNumber(item,item+"不是数字");
            let params = match[1];
            if(params != null){
                let fill = "0";
                let num = new String(item*100).split(".");
                let intNum = num[0];
                let floatNum = num[1];
                if(match[4]){
                    let intFloat = match[4].split(".");//计算整数和小数部分
                    let intLen = intFloat[0];
                    let floatLen = intFloat[1];
                    //将整数位扩展到指定长度
                    if(intLen != null && intNum != null){
                        if(new String(intNum).length < parseInt(intLen)){
                            intNum = StringUtils.alignRight(new String(intNum),parseInt(intLen),fill);
                        }else{
                            intNum = new String(intNum);
                        }
                    }
                    //将小数位扩展到指定长度
                    if(floatLen != null){
                        if(floatNum != null){
                            floatNum = StringUtils.alignLeft(new String(floatNum==null?"":floatNum),parseInt(floatLen),fill);
                        }else{
                            floatNum = StringUtils.repeat(fill,floatLen);
                        }
                    }
                }
                //是否要格式化
                if(StringUtils.containt(",)",match[2])){
                    if(match[2] == ","){
                        return StringUtils.concat(NumberUtils.toStringSeparator(intNum),".",floatNum,"%");
                    }else if(match[2] == ")"){
                        return StringUtils.concat("(",intNum,".",floatNum,"%",")");
                    }
                }
                //不需要格式化
                return StringUtils.concat(intNum,".",floatNum,"%");
            }
            return StringUtils.concat(item*100,"%");
        },
        "m":function(replace,item){
            let reg = /%(([,]?)((\d+)?))?m/i;
            let match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            let params = match[1];
            let num = new String(item).split(".");
            let intNum = num[0];
            let floatNum = StringUtils.left(num[1],2);
            if(params != null){
                //是否要格式化
                if(StringUtils.containt(",",match[2])){
                    if(match[2] == ","){
                        item = StringUtils.concat(NumberUtils.toStringSeparator(intNum),".",floatNum);
                    }
                }
                //添加货币符号
                switch (match[3]){
                    case "2"://美元
                        return StringUtils.concat("$",item);
                        break;
                    default://默认人民币
                        return StringUtils.concat("¥",item);
                        break;
                }
            }
            //默认为人民币
            return StringUtils.concat("¥",intNum,".",floatNum);
        },
        "b":function(replace,item){
            let reg = /%(\d+)?b/i;
            let match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            let params = match[1];
            if(params != null){
                let fill = "0";
                let len = parseInt(match[1]);//数字共占多少字符
                if(new String(item).toString(2).length < parseInt(len)){
                    return StringUtils.alignRight(new Number(new String(item)).toString(2),len,fill);
                }else{
                    return new Number(new String(item)).toString(2);
                }
            }
            return new Number(new String(item)).toString(2);
        },
        "o":function(replace,item){
            let reg = /%(\d+)?o/i;
            let match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            let params = match[1];
            if(params != null){
                let fill = "0";
                let len = parseInt(match[1]);//数字共占多少字符
                if(new String(item).toString(8).length < parseInt(len)){
                    return StringUtils.alignRight(new Number(new String(item)).toString(8),len,fill);
                }else{
                    return new Number(new String(item)).toString(8);
                }
            }
            return new Number(new String(item)).toString(8);
        },
        "x":function(replace,item){
            let reg = /%(\d+)?x/i;
            let match = replace.match(reg);
            ValidateUtils.isNull(match,replace+"格式不正确");
            let params = match[1];
            if(params != null){
                let fill = "0";
                let len = parseInt(match[1]);//数字共占多少字符
                if(new String(item).toString(16).length < parseInt(len)){
                    return StringUtils.alignRight(new Number(new String(item)).toString(16),len,fill);
                }else{
                    return new Number(new String(item)).toString(16);
                }
            }
            return new Number(new String(item)).toString(16);
        }
    };

    return StringUtils.replaces(str,replaces,items,function(replace,item){
        let format = formats[StringUtils.right(replace,1)];
        ValidateUtils.isNull(format,replace+"格式不被支持，请确认是否有误");
        return format(replace,item);
    });
}
let NumberUtils = {};
/**
 * 保存小数位数
 * @param {Object} obj
 * @param {Object} fixed
 */
NumberUtils.toFixed = function(obj,fixed){
    ValidateUtils.isNotNumber(obj,obj+"不是数字类型，无法保存小数位数");
    let num = null;
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
    if(new String(obj).indexOf(".") != -1){//跳过符点数
        return new String(obj);
    }
    let zeroNum = NumberUtils.countZero(obj);//计算数字前面有多少0
    let chars = new String(parseInt(obj)).split("");//去掉数字前面的0
    for(let i = chars.length-3;i>0;i-=3){
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
let RandomUtils = {};
/**
 * 获得随机数
 * @param {Object} start 开始
 * @param {Object} end 结束（不包含）
 */
RandomUtils.random = function(start,end){
    return Math.floor(Math.random()*(end-start))+start;
}
let DateUtils = {};
