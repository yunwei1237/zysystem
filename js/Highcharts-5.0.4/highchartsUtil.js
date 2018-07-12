/**
 * 获得饼图
 * @param {Object} title
 * @param {Object} data
 */

$.fn.getPie = function(title,data){
	var chart = {
       plotBackgroundColor: null,
       plotBorderWidth: null,
       plotShadow: false
   };
   var title = {
      text: title   
   };      
   var tooltip = {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   };
   var plotOptions = {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
            enabled: true,
            format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            style: {
               color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
         }
      }
   };
   var series= [{
      type: 'pie',
      name: '所占比例',
      data: data
   }];     
      
   var json = {};   
   json.chart = chart; 
   json.title = title;     
   json.tooltip = tooltip;  
   json.series = series;
   json.plotOptions = plotOptions;
   this.highcharts(json);
}
/**
 * 获得曲线图，折线图
 * @param {Object} title
 * @param {Object} data
 */
$.fn.getCurveGraph = function(title,categories,ytitle,data){
	var title = {
      text: title 
   };
   /*var subtitle = {
      text: 'Source: runoob.com'
   };*/
   var xAxis = {
      categories: categories
   };
   var yAxis = {
      title: {
         text: ytitle
      }
   };
   var plotOptions = {
      line: {
         dataLabels: {
            enabled: true
         },   
         enableMouseTracking: false
      }
   };
   var series= data;
   
   var json = {};

   json.title = title;
   /*json.subtitle = subtitle;*/
   json.xAxis = xAxis;
   json.yAxis = yAxis;  
   json.series = series;
   json.plotOptions = plotOptions;
   this.highcharts(json);
}

/**
 * 获得柱形图
 * @param {Object} title
 * @param {Object} data
 */
$.fn.getColumnarGraph = function(title,subtitle,categories,ytitle,data){
	var chart = {
      type: 'column'
   };
   var title = {
      text: title   
   };
   var subtitle = {
      text: subtitle  
   };
   var xAxis = {
      categories: categories,
      crosshair: true
   };
   var yAxis = {
      min: 0,
      title: {
         text: ytitle         
      }      
   };
   var tooltip = {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
         '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
   };
   var plotOptions = {
      column: {
         pointPadding: 0.2,
         borderWidth: 0
      }
   };  
   var credits = {
      enabled: false
   };
   
   var series= data;     
      
   var json = {};   
   json.chart = chart; 
   json.title = title;   
   json.subtitle = subtitle; 
   json.tooltip = tooltip;
   json.xAxis = xAxis;
   json.yAxis = yAxis;  
   json.series = series;
   json.plotOptions = plotOptions;  
   json.credits = credits;
   this.highcharts(json);
}