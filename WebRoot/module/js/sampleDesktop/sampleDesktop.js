/**
 * 
 */
var obj = {
		reID:"",
		order_c:0 ,
		order_f:0 ,
		order_t:0
		
}
$(function(){
	initData();
	initEvent();
});
/*
 * 初始化表格数据
 */
function initData(){
	initContractTable();
	initFileTable();
	initTidingsTable();
}

function initContractTable(){
	
	$('.contractTable').bootstrapTable({
					
				striped : false,// 隔行变色效果
				pagination : true,// 在表格底部显示分页条
				pageSize : 5,// 页面数据条数
				pageNumber : 1,// 首页页码
				pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
				clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
				cache : false,// 禁用 AJAX 数据缓存
				sortName : 'ID',// 定义排序列
				sortOrder : 'desc',// 定义排序方式 getRceiptlistWithPaging
				url : '/laboratorySystem/receiptlistController/getReceiptlistAll.do',// 服务器数据的加载地址
				sidePagination : 'server',// 设置在哪里进行分页
				method : "post",
				dataType : "json",// 服务器返回的数据类型
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				queryParams : function queryParams(params) {
					var param = {};
					param.limit = params.limit;// 页面大小 param.offset=
					// params.offset; //偏移量
					param.search = "";
					param.offset = params.offset;
					obj.order_c = params.offset + 1; // 偏移量是从0开始
					param.sort = params.sort; // 排序列名
					param.order = params.order;// 排位命令（desc，asc）
					return param;
				}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
				selectItemName : '',// radio or checkbox 的字段名
				onClickRow : function(row,$element,field){
					$(".leftArea .row span").eq(1).text(row.coCode);
					getCurrentFile(row.reID);
					/*console.log(row);
					console.log($element);
					console.log(field);*/
					
				},
				onLoadSuccess : function(data) {
					console.log(data);
					 if(data.total == 0)
						{
							  $(".leftArea .row span").eq(1).text("无");
							 
						}
				},
				columns : [
						{
							title : '序号',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '5%',// 宽度
							visible : true,
							formatter : function(value, row, index) { 
								checkData("cAndRe",row);
								
							 if(index == 0 && row != null)
								{
									  $(".leftArea .row span").eq(1).text(row.coCode);
									  obj.reID = row.reID;
									  getCurrentFile(obj.reID);
								}
								return obj.order_c++;
							}
						},{
							field : 'reID',// 返回值名称
							title : '交接单ID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'coID',// 返回值名称
							title : 'coID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},{
							field : 'proID',// 返回值名称
							title : '项目ID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'coCode',// 返回值名称
							title : '合同编号',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '25%'// 宽度
						},
						{
							field : 'cName',// 返回值名称
							title : '合同名称',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '20%'// 宽度
						},
						{
							field : 'reCode',// 返回值名称
							title : '交接单编码',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '35%'// 宽度
						},
						{
							field : 'reType',// 返回值名称
							title : '交接单类型',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '35%',// 宽度
							visible : false
						},
						{
							field : 'reState',// 返回值名称
							title : '状态',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '15%'// 宽度
					
						} ]
			// 列配置项,详情请查看 列参数 表格
			/* 事件 */
			});
}
function initFileTable(){
	$('.fileTable').bootstrapTable(
			{
						// 定义表格的高度height: 500,
				striped : false,// 隔行变色效果
				pagination : true,// 在表格底部显示分页条
				pageSize : 5,// 页面数据条数
				pageNumber : 1,// 首页页码
				pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
				clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
				// checkbox
				cache : false,// 禁用 AJAX 数据缓存
				sortName : 'ID',// 定义排序列
				sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
				url : '/laboratorySystem/receiptlistController/getReFiletByReID.do',// 服务器数据的加载地址
				sidePagination : 'server',// 设置在哪里进行分页
				method : "post",
				dataType : "json",// 服务器返回的数据类型
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				queryParams : function queryParams(params) {
					var param = {};
					param.limit = params.limit;// 页面大小 param.offset=
					// params.offset; //偏移量
					param.search = "";
					param.offset = params.offset;
					obj.order_f = params.offset + 1; // 偏移量是从0开始
					param.sort = params.sort; // 排序列名
					param.order = params.order;// 排位命令（desc，asc）
					param.reID = obj.reID;
					return param;
				}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
				selectItemName : '',// radio or checkbox 的字段名
				onClickRow : function(row,$element,field){
					$(".RightArea .row .col-xs-7 span").eq(1).text(row.fileName);
				
				},
				onLoadSuccess : function(data) {
					console.log(data);
					if(data.total == 0){
						$(".RightArea .row .col-xs-7 span").eq(1).text("无");
					}
				},
				columns : [
						{
							title : '序号',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '5%',// 宽度
							visible : true,
							formatter : function(value, row, index) {
								checkData("file",row);
							    if(index == 0 && row != null)
									{
										$(".RightArea .row .col-xs-7 span").eq(1).text(row.fileName);
									}
								
								return obj.order_f++;
							}
						},
						{
							field : 'ID',// 返回值名称
							title : 'fileID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'fileName',// 返回值名称
							title : '文件名',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '35%',// 宽度
						},
						{
							field : 'remarks',// 返回值名称
							title : '备注',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '30%'// 宽度
						},
						/*{
							field : 'uploadName',// 返回值名称
							title : '上传人',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '15%'// 宽度
						},*/
						{
							field : 'uploadTime',// 返回值名称
							title : '上传时间',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '30%'// 宽度
						}]
			// 列配置项,详情请查看 列参数 表格
			/* 事件 */
			});
}
function initTidingsTable(){
	$('.tidingsTable').bootstrapTable( 
			{
						// 定义表格的高度height: 500,
		
				striped : false,// 隔行变色效果
				pagination : true,// 在表格底部显示分页条
				pageSize : 5,// 页面数据条数
				pageNumber : 1,// 首页页码
				pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
				clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
				// checkbox
				cache : false,// 禁用 AJAX 数据缓存
				sortName : 'ID',// 定义排序列
				sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
				url : '/laboratorySystem/messageController/getMessageByUserID.do',// 服务器数据的加载地址
				sidePagination : 'server',// 设置在哪里进行分页
				method : "post",
				dataType : "json",// 服务器返回的数据类型
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				queryParams : function queryParams(params) {
					var param = {};
					param.limit = params.limit;// 页面大小 param.offset=
					// params.offset; //偏移量
					param.search = "";
					param.offset = params.offset;
					obj.order_t = params.offset + 1; // 偏移量是从0开始
					param.sort = params.sort; // 排序列名
					param.order = params.order;// 排位命令（desc，asc）
					param.isRead = false;
					return param;
				}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
				selectItemName : '',// radio or checkbox 的字段名
				onLoadSuccess : function(data) {
					console.log(data);
				},
				columns : [
						{
							title : '序号 ',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '5%',// 宽度
							visible : true,
							formatter : function(value, row, index) {
								checkData("tiding",row);
								return obj.order_t++;
							}
						},
						{
							field : 'mnID',// 返回值名称
							title : 'messageNoticeID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'mID',// 返回值名称
							title : 'messageID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'content',// 返回值名称
							title : '消息内容',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '15%',// 宽度
						},
						{
							field : 'createTime',// 返回值名称
							title : '通知时间',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '20%'// 宽度
						},
						{
							field : 'state',// 返回值名称
							title : '操作',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '20%',// 宽度
							formatter : function(value, row, index) {
								if(value == "未查看")
								var look = "", edit = "", download = "";
								look = '<span onclick= "lookMessage(\''
										+ row.mnID
										+ '\')" data-toggle="tooltip" data-placement="top" title="确认查看"  class="glyphicon glyphicon-eye-open" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
								return look;
							}
						} ]
			// 列配置项,详情请查看 列参数 表格
			/* 事件 */
			});
}
//得到交接单的关联文件
function getCurrentFile(reID){
	if(reID == "" || reID == undefined || reID == null){
		
	}
	else {
		obj.reID = reID;
		$('.fileTable').bootstrapTable( 'refresh',
			{
				silent : false,
				url : "/laboratorySystem/receiptlistController/getReFiletByReID.do",
				query : {
					reID : reID
				}
	
			});
	}
}
function initEvent(){
	initMessage();
}
function initMessage(){
	$(".tidingHead ul li").click(function(){
	      $(".tidingHead ul li").toggleClass("selected");
	       refrehMessage($(this).text());
	  });
}
function refrehMessage(text){
	var param = {};
	 if(text == "提示信息")
		 param.isRead = false;
	 else param.isRead = true;
		 $('.tidingsTable') .bootstrapTable( 'refresh',
					{
						silent : true,
						url : "/laboratorySystem/messageController/getMessageByUserID.do",
						query : param
			});
}
/*
 * 
 * 
 * 按钮图标选择事件
 */
//查看交接单
function viewRe(){
	var data = $('.contractTable').bootstrapTable('getSelections');
    //弹出确认框
	if (data.length != 1) {
		window.location = "module/receiptlistManage/receiptlistView.jsp?reID=" + data[0].reID;
		return;
	}
	else{
		chen.alert("请选中一条数据");
		return;
	}
	
}
//编辑交接单
function editRe(){
	var data = $('.contractTable').bootstrapTable('getSelections');
	
    //弹出确认框
	if (data.length != 1) {
		var reObj = data[0];
		if(reObj.reType == "接受") 
			 window.location.href = "./addRecelist.jsp?reID="+reObj.reID
			 						+"&coID=" + reObj.coID + "&comID="
			 						+ reObj.comID + "&coCode=" + reObj.coCode
			 						+ "&addState=no&reCode=" + reObj.reCode
			 						+"&lookState=edit";
		 //退还样品-交接单编辑的页面
		else {
				window.location.href = "./receiptlistReturn.jsp?reID="
										+reObj.reID+"&coID=" + reObj.coID + "&comID="
										+ reObj.comID + "&coCode=" + reObj.coCode
										+ "&state=edit";
			}
	}
	else{
		chen.alert("请选中一条数据");
		return;
	}
	
}
//发送检测报告页面
function sendTestreport(){
	window.location.href = "module/jsp/testReportManage/testReportSendRecordManage.jsp"
}
//有合同新增--接受类交接单
function addRe() {
	var data = $('.contractTable').bootstrapTable('getSelections');
	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}
	if(data[0].coState >= 4 ){
		alert(data[0].coState +" 表示已经审核通过了")
	}else{
		alert(data[0].coState +" 表示没有审核通过了")
	}
	var result = initAddReceiptlist(data[0],"yes");  //创建交接单跳转
	window.location.href = "./addRecelist.jsp?reID="
		    +result.reID+"&coID=" 
	        + data[0].coID + "&comID="
			+ data[0].comID + "&coCode=" + data[0].coCode
			+ "&addState=yes&reCode=" + result.reCode+"&proID="+data[0].proID;

}
//创建交接单 --各种类型
function initAddReceiptlist(data,state) {
	var param = deepCopy(data);
	var result ;
	    param.state = state;
          $.ajax({
				url : '/laboratorySystem/receiptlistController/addReceiptList.do',
				dataType : "json",
				type : "post",
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				async : false,
				data : param,
				success : function(o) {
					 result  = JSON.parse(o);
					 console.log(result);
				},
				error : function() {
					alert(" 创建交接单失败 ");
				}
          });
          return result;
}
// 无合同新增--接受类交接单
function addReNo() {
	// 在这里创建新的合同
	var result = initAddReceiptlist({},"no");  //创建交接单跳转
	window.location.href = "./addRecelist.jsp?reID="
			+result.reID+"&coID=" 
			+ result.coID + "&comID="
			+ "" + "&coCode=" + result.coCode
			+ "&addState=no&reCode=" + result.reCode+"&proID="+result.proID;
}


// 有合同新增--退还类交接单
function returnSample() {
	var data = $('.contractTable').bootstrapTable('getSelections');
	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}
	if(data[0].comID == null || data[0].comID == ""){
		alert("此时你还没有样品可以退");
	}
	var result = initAddReceiptlist(data[0],"return");
	window.location.href = "./recelistReturn.jsp?reID="+result.reID
							+"&coID=" + result.coID + "&comID="
							+ "" + "&coCode=" + result.coCode
							+ "&state=add&reCode=" + result.reCode;
}
function lookMessage(ID){
	var isLook = confirm("确认已经查看信息！");
	if(isLook == true){
		$.ajax({
			url : '/laboratorySystem/messageController/readedMessageByID.do',
			dataType : "json",
			type : "post",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
			async : false,
			data : {
				messageNoticeID:ID
			},
			success : function(o) {
				
			},
			error : function() {
			}
		});
		$('.tidingsTable').bootstrapTable( 'refresh',null);
	}
}
function checkData(who,dataObj){
	switch (who){
		case "cAndRe" :checkDataRe(dataObj); break;
		case "file" : checkDataFile(dataObj);break;
		case "tiding" :checkDataTiding(dataObj); break;
		default : break;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
		
	}
}

//验证合同交接单数据
function checkDataRe(dataObj){
	if (!dataObj.hasOwnProperty("reID") || dataObj.reID == null
			|| dataObj.reID.trim() == "NULL") {
		dataObj.reID = "";
	}
	if (!dataObj.hasOwnProperty("reState") || dataObj.reState == null
			|| dataObj.reState.trim() == "NULL") {
		dataObj.reState = "无交接单";
	}
	if (!dataObj.hasOwnProperty("reType") || dataObj.reType == null
			|| dataObj.reType.trim() == "NULL") {
		dataObj.reType = "接受";
	}
	if (!dataObj.hasOwnProperty("reCode") || dataObj.reCode == null
			|| dataObj.reCode.trim() == "NULL") {
		dataObj.reCode = "";
	}
	if (!dataObj.hasOwnProperty("coID") || dataObj.coID == null
			|| dataObj.coID.trim() == "NULL") {
		dataObj.coID = "";
	}
	if (!dataObj.hasOwnProperty("coCode") || dataObj.coCode == null
			|| dataObj.coCode.trim() == "NULL") {
		dataObj.coCode = "";
	}
	if (!dataObj.hasOwnProperty("cName") || dataObj.cName == null
			|| dataObj.cName.trim() == "NULL") {
		dataObj.cName = "";
	}
	/*if (!dataObj.hasOwnProperty("cState") || dataObj.cState == null
			|| dataObj.cState.trim() == "NULL") {
		dataObj.cState = "";
	}*/ //数字不能trim()
	
}

//验证交接单文件信息数据
function checkDataFile(dataObj){
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null
			|| dataObj.fileName.trim() == "NULL") {
		dataObj.fileName = "";
	}
	if (!dataObj.hasOwnProperty("uploadTime") || dataObj.uploadTime == null
			|| dataObj.uploadTime.trim() == "NULL") {
		dataObj.uploadTime = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks.trim() == "NULL") {
		dataObj.remarks = "";
	}
}
//验证提示信息数据
function checkDataTiding(dataObj){
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("content") || dataObj.content == null
			|| dataObj.content.trim() == "NULL") {
		dataObj.content = "";
	}
	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null
			|| dataObj.createTime.trim() == "NULL") {
		dataObj.createTime = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null
			|| typeof dataObj.state == undefined) {
		dataObj.remarks = "未查看";
	}
}
