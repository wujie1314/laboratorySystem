// 请求数据时的额外参数
var param = {};


$(function() {
	setID();
	getContractByID();
	updateContractFileID();
});

//初始化数据
function initContractFile(){
	$("#show_contractFile").bootstrapTable({
		//height : 200,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 4,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 4 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'uploadTime',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'fileInformationController/getContractFileWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.ID = $.trim($('#edit_contractID').val())
			return param;
		}, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		onLoadSuccess : function(data) {
			checkDate(data, "file");
			console.log(data);
		},
		columns:[{
			field:'ID',//返回值名称
			title:'文件ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"5%",//宽度
			visible:false
		},{
			field:'fileName',//返回值名称
			title:'文件名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"31%",//宽度
		},{
			field:'uploaderID',//返回值名称
			title:'上传人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"5%",//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'上传人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"12%",//宽度
		},{
			field:'uploadTime',//返回值名称
			title:'上传时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"19%",//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"17%",//宽度
		},{
			field:'',
			title:'操作',
			align:'center',
			valign:'middle',
			width:"20%",
			formatter:function(value,row,index){    
                 var a = "<img src ='module/img/download_icon.png' onclick='downFile(\""+ row.ID +"\")' title='下载合同文件' style='cursor:pointer;padding-right:8px;'></img>";
                 var b = "<img src ='module/img/view_icon.png' onclick='openFile(\""+ row.ID +"\")' title='查看合同文件' style='cursor:pointer;padding-right:8px;'></img>";
                 var c = "<img src ='module/img/delete_icon.png' onclick='delFile(\""+ row.ID +"\",\"" + row.fileName +"\")' title='删除合同文件' style='cursor:pointer;padding-right:8px;'></img>";
                 return a+b+c;
          }   
		}]////列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

/*//请求数据时的额外参数
function fileQueryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'uploadTime', 
		order : 'asc',
		ID : $.trim($('#edit_contractID').val())
	};
    return searchCondition;
}*/

/*//请求数据时的额外参数
function itemQueryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'ID', 
		order : 'asc',
		ID : $.trim($('#edit_contractID').val())
	};
    return searchCondition;
}*/

//得到地址栏参数的值
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)
    	 return  unescape(r[2]);
     return null;
}

/* 刷新方法 */
function refresh(){
	var ID = $('#edit_contractID').val();
	window.location.href="module/jsp/contractManage/EditContract.jsp?ID=" + ID;
}

function setID(){
	var ID = GetQueryString("ID");
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID不能为空！"); 
	}
	$('#edit_contractID').val(ID);
}

//得到合同的信息
function getContractByID(){
	var ID = $('#edit_contractID').val();
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		$.ajax({  
		     url:'contractController/getContractByID.do',// 跳转到 action
		     type:'post', 
		     data:parame,
		     dataType:'json',
		     success:getid=function(data){
		    	 if (data) {
		    		var myobj = JSON.parse(data);
		    		
		    		$('#edit_contractCode').html(myobj[0].contractCode);
		    		$('#edit_contractName').val(myobj[0].contractName);
		    		$('#edit_address').val(myobj[0].address);
		    		$('#edit_signAddress').val(myobj[0].signAddress);
		    		$('#edit_companyName').attr({'value' : "" + myobj[0].companyName + "",'name' : "" + myobj[0].companyID + ""});
		    		$('#edit_oppositeMen').val(myobj[0].oppositeMen);
		    		$('#edit_linkPhone').val(myobj[0].linkPhone);
		    		$('#edit_startTime').val(myobj[0].startTime);
		    		$('#edit_endTime').val(myobj[0].endTime);
		    		$('#edit_employeeName').attr({'value' : "" + myobj[0].employeeName + "",'name' : "" + myobj[0].employeeID + ""});
		    		$('#edit_signTime').val(myobj[0].signTime);
		    		$('#edit_contractAmount').val(myobj[0].contractAmount);
		    		if(myobj[0].isClassified == "1"){
		    			$('#r1').prop('checked','true');
		    			$('#r2').prop('checked','');
		    		}else if(myobj[0].isClassified == "0"){
		    			$('#r1').prop('checked','');
		    			$('#r2').prop('checked','true');
		    		}
		    		$('#edit_classifiedLevel').val(myobj[0].classifiedLevel);
		    		initContractFile();
		    		initContractFileItem();
		    		}
		    	 }
		});
	}
}

/**
 * 生成合同文件
 */
function coverContractFile(){
	swal("正在生成合同，请等候！"); 
	var ID = GetQueryString("ID");; 
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		
			$.ajax({
			  url:'contractController/coverContractFile.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  if(o<=0){
					  swal("不存在合同模板文件");
				  }
				  swal("合同已生成！"); 
				  setTimeout(refrehFileTable, 1000);
			  },
			  error:function(o){
				  console.log(o);
			  }
			});
	}
}

/**
 * 下载文件
 * @param id
 */
function downFile(id){
	downOneFile(id);
}

function openFile(id){
	$.post("fileOperateController/onlinePreview.do", {
		ID : id
	}, function(result) {
		if (result != null || result != "null") {
			window.location.href = "module/jsp/documentOnlineView.jsp";
		} else {
			swal("无法查看");
		}
	});
}

//删除合同的文件
function delFile(id,fileName) {
	 if (confirm("确认删除：" + fileName)) {  
		 var data;
		   $.ajax({
			url : 'fileInformationController/deleteFileByID.do',
			dataType : "json",
			async : false,
			data : {
				fileID : id
			},
			success : function(o) {
				 data = JSON.parse(o); // error
				if (data == true) {
					swal("delete sunceesul");
				} else {
					swal("delete faire");
				}
			},
			error : function() {
				return false;
			}
		   });
		   refresh();
		   //$('#fileTable').bootstrapTable('refresh',null);  
     }  
     else {  
         return;  
     }  
	

}

//初始化数据(合同细项)
function initContractFileItem(){
	$("#show_contractFileItem").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 4,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 4 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'ID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'contractFineItemController/getContractFileItemWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.ID = $.trim($('#edit_contractID').val())
			return param;
		}, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		onLoadSuccess : function(data) {
			checkDate(data, "item");
			console.log(data);
		},
		columns:[/*{
			checkbox:true,
			align:'center',//水平居中显示
			width:'5%'//宽度
		}*/{
			field:'ID',//返回值名称
			title:'合同细项ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'fineItemCode',//返回值名称
			title:'合同细项编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'18%',//宽度
		},{
			field:'testProjectID',//返回值名称
			title:'检测项目ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'nameCn',//返回值名称
			title:'检测项目(中文)',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'nameEn',//返回值名称
			title:'检测项目(English)',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'isOutsourcing',//返回值名称
			title:'是否外包',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'money',//返回值名称
			title:'金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'price',//返回值名称
			title:'单价',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'number',//返回值名称
			title:'数量',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'hour',//返回值名称
			title:'小时',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'calculateType',//返回值名称
			title:'计算方式',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'departmentID',//返回值名称
			title:'检测部门ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'departmentName',//返回值名称
			title:'检测部门',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'12%',//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'13%',//宽度
		},{
			field:'',
			title:'操作',
			align:'center',
			valign:'middle',
			width:'20%',
			 formatter:function(value,row,index){    
                 var b = '<img src ="module/img/update_icon.png" onclick="openEditItemModal(\'' + row.ID + 
                 '\',\'' + row.fineItemCode + '\',\'' + row.testProjectID + '\',\'' + row.nameCn + '\',\'' + 
                 row.nameEn + '\',\'' + row.number + '\',\'' + row.price + '\',\'' + row.money + '\',\'' + 
                 row.departmentID + '\',\'' + row.departmentName + '\',\'' + row.calculateType + '\',\'' + 
                 row.isOutsourcing + '\',\'' + row.remarks + '\',\'' + row.hour + '\')"'+
                 ' title="修改" style="cursor:pointer;padding-right:8px;"></img>';
                 var c = "<img src ='module/img/delete_icon.png' onclick='delFileItem(\""+ row.ID +"\",\"" + row.fineItemCode +"\")'"+" title='删除' style='cursor:pointer;padding-right:8px;'></img>";
                 return b+c;    
             }   
		}]////列配置项,详情请查看 列参数 表格
	});
	showSth();
	editSth();
}

//检查合同数据、合同文件数据和合同细项是否合理
function checkDate(data, who) {
	if (who == "con"){
		chenkDataCon(data);
	}
	else if (who == "file"){
		chenkDataFile(data);
	}else
		chenkDataItem(data);

}
//检查合同文件数据是否合理
function chenkDataCon(dataObj) { // 后台数据字段为空就不会传上来
	swal("12");
	if (!dataObj.hasOwnProperty("contractCode") || dataObj.contractCode == null || dataObj.contractCode == undefined ) {
		dataObj.contractCode = ""; //没有合同文件
	}
	if (!dataObj.hasOwnProperty("contractName") || dataObj.contractName == null || dataObj.contractName == undefined || dataObj.contractName.trim() == "") {
		 dataObj.contractName = "";
	}
	swal(dataObj.contractName);
	if (!dataObj.hasOwnProperty("companyID") || dataObj.companyID == null || dataObj.companyID == undefined ) {
		dataObj.companyID = ""; 
	}
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null || dataObj.companyName == undefined ) {
		dataObj.companyName = ""; 
	}
	if (!dataObj.hasOwnProperty("oppositeMen") || dataObj.oppositeMen == null || dataObj.oppositeMen == undefined || dataObj.oppositeMen.trim() == "") {
		dataObj.oppositeMen = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null || dataObj.linkPhone == undefined ) {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("employeeID") || dataObj.employeeID == null || dataObj.employeeID == undefined || dataObj.employeeID.trim() == "") {
		dataObj.employeeID = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null || dataObj.contractCode == undefined || dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("address") || dataObj.address == null || dataObj.address == undefined || dataObj.address.trim() == "") {
		dataObj.address = "";
	}
	if (!dataObj.hasOwnProperty("signAddress") || dataObj.signAddress == null || dataObj.signAddress == undefined || dataObj.signAddress.trim() == "") {
		dataObj.signAddress = "";
	}
	if (!dataObj.hasOwnProperty("signTime") || dataObj.signTime == null || dataObj.signTime == undefined || dataObj.signTime.trim() == "") {
		dataObj.signTime = "";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null || dataObj.startTime == undefined || dataObj.startTime.trim() == "") {
		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("endTime") || dataObj.endTime == null || dataObj.endTime == undefined || dataObj.endTime.trim() == "") {
		dataObj.endTime = "";
	}
	if (!dataObj.hasOwnProperty("contractAmount") || dataObj.contractAmount == null || dataObj.contractAmount == undefined ) {
		dataObj.contractAmount = "0";
	}
	if (!dataObj.hasOwnProperty("isClassified") || dataObj.isClassified == null || dataObj.isClassified == undefined || dataObj.isClassified.trim() == "") {
		dataObj.isClassified = "0";
	}
	if (!dataObj.hasOwnProperty("classifiedLevel") || dataObj.classifiedLevel == null || dataObj.classifiedLevel == undefined || dataObj.classifiedLevel.trim() == "") {
		dataObj.classifiedLevel = "3";
	}
}

//检查合同文件数据是否合理
function chenkDataFile(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID == undefined
			|| dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null
			|| dataObj.fileName == undefined
			|| dataObj.fileName.trim() == "") {
		dataObj.fileName = "";
	}
	if (!dataObj.hasOwnProperty("uploaderID") || dataObj.uploaderID == null
			|| dataObj.uploaderID == undefined
			|| dataObj.uploaderID.trim() == "") {
		dataObj.uploaderID = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null
			|| dataObj.employeeName == undefined
			|| dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("uploadTime") || dataObj.uploadTime == null
			|| dataObj.uploadTime == undefined
			|| dataObj.uploadTime.trim() == "") {
		dataObj.uploadTime = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks == undefined
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.remarks = "";
	}
}

//检查合同细项是否合理
function chenkDataItem(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID == undefined
			|| dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fineItemCode") || dataObj.fineItemCode == null
			|| dataObj.fineItemCode == undefined
			|| dataObj.fineItemCode.trim() == "") {
		dataObj.fineItemCode = "";
	}
	if (!dataObj.hasOwnProperty("testProjectID") || dataObj.testProjectID == null
			|| dataObj.testProjectID == undefined
			|| dataObj.testProjectID.trim() == "") {
		dataObj.testProjectID = "";
	}
	if (!dataObj.hasOwnProperty("nameCn") || dataObj.nameCn == null
			|| dataObj.nameCn == undefined
			|| dataObj.nameCn.trim() == "") {
		dataObj.nameCn = "";
	}
	if (!dataObj.hasOwnProperty("nameEn") || dataObj.nameEn == null
			|| dataObj.nameEn == undefined
			|| dataObj.nameEn.trim() == "") {
		dataObj.nameEn = "";
	}
	if (!dataObj.hasOwnProperty("isOutsourcing") || dataObj.isOutsourcing == null
			|| dataObj.nameEn == undefined
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.isOutsourcing = "";
	}
	if (!dataObj.hasOwnProperty("money") || dataObj.money == null
			|| dataObj.money == undefined) {
		dataObj.money = "";
	}
	if (!dataObj.hasOwnProperty("price") || dataObj.price == null
			|| dataObj.price == undefined) {
		dataObj.price = "";
	}
	if (!dataObj.hasOwnProperty("hour") || dataObj.hour == null
			|| dataObj.hour == undefined) {
		dataObj.hour = "";
	}
	if (!dataObj.hasOwnProperty("number") || dataObj.number == null
			|| dataObj.number == undefined) {
		dataObj.number = "";
	}
	if (!dataObj.hasOwnProperty("calculateType") || dataObj.calculateType == null
			|| dataObj.calculateType == undefined) {
		dataObj.calculateType = "";
	}
	if (!dataObj.hasOwnProperty("departmentID") || dataObj.departmentID == null
			|| dataObj.departmentID == undefined
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.departmentID = "";
	}
	if (!dataObj.hasOwnProperty("departmentName") || dataObj.departmentName == null
			|| dataObj.departmentName == undefined
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.departmentName = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks == undefined
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.remarks = "";
	}
}

// 上传文件预处理
function showFileUploadModal(){
	fileUploadInit("#file_upload");
	$("#file_uploadModal").modal("show");
}


//上传文件预处理
function submitFile(){
	//loadingData();
	var remarks = $('#fileRemarks').val()
	if (!remarks || typeof(remarks) == "undefined" || remarks == '') 
	{ 
		remarks = "";
	}
	var fileObj = {};
	fileObj.path = "";//filePath; // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	fileObj.fileTypeNumber = 1;//fileTypeNumber; // 文件类型
	fileObj.firstDirectoryName = "项目文件";//fileFirstDirectory; // 一级目录
	fileObj.secondDirectoryName = "";//fileSecondDirectory; // 二级目录
	fileObj.thirdDirectoryName = "合同文件";//fileThirdDirectory //三级目录
	fileObj.belongtoID = $('#edit_contractID').val();
 	fileObj.otherInfo = "";//fileOtherInfo; // 其他参数
	fileObj.remarks = remarks;//fileRemarks; // 备注
	
	//文件上传
	fileUpload("#file_upload",fileObj.filePath, fileObj.fileTypeNumber,  fileObj.belongtoID,fileObj.firstDirectoryName, fileObj.secondDirectoryName,fileObj.thirdDirectoryName,
			 fileObj.otherInfo, fileObj.remarks) ;
	 	 
	setTimeout(refrehFileTable, 1000);
}

//文件上传成功后操作
function refrehFileTable() {
	$('#show_contractFile').bootstrapTable('refresh', null);
	$('#file_uploadModal').modal("hide");
}

function updateContractFileID(){
	var contractID = $('#edit_contractID').val();
	if(!contractID || typeof(contractID) == "undefined" || contractID.trim() == ""){
		return;
	}else{
		$.ajax({  
		    url:'contractController/updateContractFileID.do',// 跳转到 action
		    type:'post', 
		    data:{contractID:contractID},
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var myobj = JSON.parse(data);
		    	}
		    }
		});
	}
}



/*
 * 改变计算方式
 */
function calculateType(){
	var Type1 = $('input[name="calculateType1"]:checked').val();
	if(Type1 == "0"){
		$('.add_number').show();
		$('.add_hour').hide();
	}else if(Type1 == "1"){
		$('.add_hour').show();
		$('.add_number').hide();
	}
	
	var Type2 = $('input[name="calculateType2"]:checked').val();
	if(Type2 == "0"){
		$('.edit_number').show();
		$('.edit_hour').hide();
	}else if(Type2 == "1"){
		$('.edit_hour').show();
		$('.edit_number').hide();
	}
}

/*
 * 是否外包
 */
function outChange(){
	var out1 = $('input[name="isOutsourcing1"]:checked').val();
	if(out1 == "0"){
		$('.departmentName0').show();
		$('.departmentName1').hide();
	}else if(out1 == "1"){
		$('.departmentName1').show();
		$('.departmentName0').hide();
	}
	
	var out2 = $('input[name="isOutsourcing2"]:checked').val();
	if(out2 == "0"){
		$('.departmentName3').show();
		$('.departmentName4').hide();
	}else if(out2 == "1"){
		$('.departmentName4').show();
		$('.departmentName3').hide();
	}
}

/**
 * 改变信息触发相关提示信息的方法(add)
 * addGetTPName
 */
function addGetTPName(){ 
	var name = $('#add_testProjectName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".testProjectName").hide();
	}else {
		var parame = {};
		parame.testProjectName = name;
		
		$.ajax({  
		    url:'testProjectController/getTestProjectByName.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var testProject,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		testProject = $(".testProjectName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].nameCn + " | " + myobj[i].nameEn + "' title='" + myobj[i].nameCn + "' name='" + myobj[i].ID + "'>" + myobj[i].nameCn + " | " + myobj[i].nameEn + "</li></ul>";
		    		}
		    		 
		    		testProject.show();
		    		testProject.empty();
		    		testProject.append(htmlElement);
		    		addClick();
		    	}
		    }
		});
	}
}

//点击事件(add)
function addClick(){ 
	
	//给input赋值
	$(".testProjectName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#add_testProjectName").val(name);
		 var ID =  $(this).attr("name");
		 var nameCn =  $(this).attr("title");
		 $('#add_testProjectName').attr({'name' : "" + ID + ""});
		 $('#add_testProjectName').attr({'value' : "" + name + ""});
		 $('#add_testProjectName').attr({'title' : "" + nameCn + ""});
		 $(".testProjectName").hide();
	})

	//隐藏提示框
	$("#addContent").click(function(){
		 $(".testProjectName").hide();
	})
	
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 * editGetTPName
 */
function editGetTPName(){ 
	var name = $('#edit_testProjectName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".testProjectName").hide();
	}else {
		var parame = {};
		parame.testProjectName = name;
		
		$.ajax({  
		    url:'testProjectController/getTestProjectByName.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var testProject,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		testProject = $(".testProjectName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].nameCn + " | " + myobj[i].nameEn + "' title='" + myobj[i].nameCn + "' name='" + myobj[i].ID + "'>" + myobj[i].nameCn + " | " + myobj[i].nameEn + "</li></ul>";
		    		}
		    		 
		    		testProject.show();
		    		testProject.empty();
		    		testProject.append(htmlElement);
		    		editClick();
		    	}
		    }
		});
	}
}

/**
 * 新增时得到相关信息方法
 */
function showSth(){ 
	 $.ajax({  
	     url:'departmentController/getDepartmentName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var department;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "";//定义HTML    
	    		 department=$("#add_departmentName1");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department.append(htmlElement);
 		    }
		}
	 });
}

/**
 * 修改时得到相关信息方法
 */
function editSth(){ 
	 $.ajax({  
	     url:'departmentController/getDepartmentName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var department;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "";//定义HTML    
	    		 department=$("#edit_departmentName1");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department.append(htmlElement);
 		    }
		}
	 });
}

function openAddItemModal(){
	$('#addContractItemModal').modal('show');
}

function openEditItemModal(ID,fineItemCode,testProjectID,nameCn,nameEn,number,price,money,departmentID,departmentName,calculateType,isOutsourcing,remarks,hour){
	
	$('#edit_fineItemID').val(ID);
	$('#edit_fineItemCode').val(fineItemCode);
	$('#edit_testProjectName').attr({'name' : "" + testProjectID + ""});
	$('#edit_testProjectName').attr({'title' : "" + nameCn + ""});
	$('#edit_testProjectName').attr({'value' : "" + nameCn + " | " + nameEn + ""});
	$('#edit_number').val(number);
	$('#edit_hour').val(hour);
	$('#edit_money').val(money);
	$('#edit_departmentID').val(departmentID);
	//$('#edit_testProjectName').attr({'name' : "" + ID + ""});
	//$('#edit_departmentName').val(departmentName);
	if(calculateType == 0){
		$("input[type=radio][name=calculateType2][value=0]").attr("checked",'checked');
		$('#edit_price1').val(price);
		$('.edit_number').show();
		$('.edit_hour').hide();
	}
	if(calculateType == 1){
		$("input[type=radio][name=calculateType2][value=1]").attr("checked",'checked');
		$('#edit_price2').val(price);
		$('.edit_hour').show();
		$('.edit_number').hide();
	}
	if(isOutsourcing == "内测"){
		$("input[type=radio][name=isOutsourcing2][value=0]").attr("checked",'checked');
		$('.departmentName3').show();
		$('.departmentName4').hide();
	}
	if(isOutsourcing == "外包"){
		$("input[type=radio][name=isOutsourcing2][value=1]").attr("checked",'checked');
		$('.departmentName4').show();
		$('.departmentName3').hide();
	}
	$('#edit_remarks').val(remarks);
	
	
	$('#editContractItemModal').modal('show');
}

//返回函数
function goback(){
	window.location.href="module/jsp/contractManage/contractManage.jsp";
}

/*
 * 修改是否保密响应
 */
function classifiedSth(){
	var isClassified = $('input[name="isClassified"]:checked').val();
	if(isClassified == "0"){
		$('#edit_classifiedLevel').val("3");
		$('#edit_classifiedLevel #Level3').show();
		$('#edit_classifiedLevel .Level3').hide();
	}else if(isClassified == "1"){
		$('#edit_classifiedLevel').val("0");
		$('#edit_classifiedLevel .Level3').show();
		$('#edit_classifiedLevel #Level3').hide();
	}
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editShowMsg(){ 
	var name = $('#edit_companyName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".companyN").hide();
	}else {
		var parame = {};
		parame.companyName = name;
		
		$.ajax({  
		    url:'companyController/getCompanyMsg.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var company,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		company = $(".companyN");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息</li></ul><ul><li class='noDate'>或新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    			for(var i=0; i < length; i++){
			    			htmlElement += "<ul><li id='" + myobj[i].mobilePhone +"' value='" + myobj[i].companyName + "' name='" + myobj[i].linkMan + "' title='" + myobj[i].address + "' class='" + myobj[i].ID + "'>" + myobj[i].companyName + "</li></ul>";
			    		}
		    		}
		    		
		    		company.show();
		    		company.empty();
		    		company.append(htmlElement);
		    		editClick();
		    	}
		    }
		});
	}
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editGetEName(){
	var name = $('#edit_employeeName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{
		$(".employeeN").hide();
	}else {
		var parame = {};
		parame.employeeName = name;
		
		$.ajax({  
		    url:'employeeController/getEmployeeName.do',// 跳转到 action  
		    type:'post',
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var employee,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML    
		    		employee = $(".employeeN");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，</li></ul>" +
		    					"<ul><li class='noDate'>请更改输入信息</li></ul>" +
		    					"<ul><li class='noDate'>或新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    			for(var i=0; i < length; i++){
			    			htmlElement += "<ul><li value='" + myobj[i].employeeName + "' class='" + myobj[i].ID + "'>" + myobj[i].employeeName + "</li></ul>";
			    		}
		    		}
		    		
		    		employee.show();
		    		employee.empty();
		    		employee.append(htmlElement);
		    		editClick();
			    }
			}
		});
	}
}

//点击事件(edit)
function editClick(){ 
	//给input赋值
	$(".companyN ul li").click(function(){
		 var name = $(this).attr("value");
		 $("#edit_companyName").val(name);
		 var ID =  $(this).attr("class");
		 var mobilePhone =  $(this).attr("id");
		 var linkMan =  $(this).attr("name");
		 var address =  $(this).attr("title");
		 $('#edit_companyName').attr({'name' : "" + ID + ""});
		 $('#edit_companyName').attr({'value' : "" + name + ""});
		 $("#edit_oppositeMen").val(linkMan);
		 //$('#edit_oppositeMen').attr("disabled",true);
		 $("#edit_linkPhone").val(mobilePhone);
		 //$('#edit_linkPhone').attr("disabled",true);
		 $("#edit_address").val(address);
		// $('#edit_address').attr("disabled",true);
		 $(".companyN").hide();
	})
	
	//隐藏提示框
	$(".showContract").click(function(){
		 $(".companyN").hide();
	})
	
	//给input赋值
	$(".testProjectName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_testProjectName").val(name);
		 var ID =  $(this).attr("name");
		 var nameCn =  $(this).attr("title");
		 $('#edit_testProjectName').attr({'name' : "" + ID + ""});
		 $('#edit_testProjectName').attr({'value' : "" + name + ""});
		 $('#edit_testProjectName').attr({'title' : "" + nameCn + ""});
		 $(".testProjectName").hide();
	})

	//隐藏提示框
	$(".row").click(function(){
		 $(".testProjectName").hide();
	})
	
	//给input赋值
	$(".employeeN ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_employeeName").val(name);
		 var ID =  $(this).attr("class");
		 $('#edit_employeeName').attr({'name' : "" + ID + ""});
		 $('#edit_employeeName').attr({'value' : "" + name + ""});
		 $(".employeeN").hide();
	})

	//隐藏提示框
	$(".showContract").click(function(){
		 $(".employeeN").hide();
	})
}

//提交审核
function submitAudit(){
	var ID = GetQueryString("ID");
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		parame.state = 2;
		$.ajax({
			  url:'contractController/updContractState.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
				  	case -2:swal("该合同没有合同文件,请添加！");
				  		break;
					case 1:swal("提交审核成功！");
						setTimeout(goback, 1500);
						break;
					case 0:swal("提交审核失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
			  }
		});
	}
}

//修改合同基本信息方法 
function edit(){
	var ID = GetQueryString("ID");
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		var contractCode = $('#edit_contractCode').html();
		var contractName = $('#edit_contractName').val();
		var signAddress = $('#edit_signAddress').val();
		var address = $('#edit_address').val();
		var companyID = $('#edit_companyName').attr("name");
		var companyName = $('#edit_companyName').val();
		var oppositeMen = $('#edit_oppositeMen').val();
		var linkPhone = $('#edit_linkPhone').val();
		var startTime = $('#edit_startTime').val();
		var endTime = $('#edit_endTime').val();
		var employeeID = $('#edit_employeeName').attr("name");
		var employeeName = $('#edit_employeeName').val();
		var signTime = $('#edit_signTime').val();
		var isClassified = $("input[name='isClassified']:checked").val();
		var classifiedLevel = $('#edit_classifiedLevel').val();
		
		if (!contractCode || typeof(contractCode) == "undefined" || contractCode.trim() == "") 
		{ 
			swal("合同编号不能为空！"); 
			return;
		}
		if (!contractName || typeof(contractName) == "undefined" || contractName.trim() == "") 
		{ 
			swal("合同名不能为空！"); 
			return;
		}
		if (!companyName || typeof(companyName) == "undefined" || companyName.trim() == "") 
		{ 
			swal("签约单位不能为空！");
			return;
		}
		if (!address || typeof(address) == "undefined" || address.trim() == "") 
		{ 
			swal("单位地址不能为空！");
			return;
		}
		if (!signAddress || typeof(signAddress) == "undefined" || signAddress.trim() == "") 
		{ 
			swal("签约地点不能为空！");
			return;
		}
		if (!oppositeMen || typeof(oppositeMen) == "undefined" || oppositeMen.trim() == "") 
		{ 
			swal("甲方法定代表人或代理人不能为空！");
			return;
		}
		if (!linkPhone || typeof(linkPhone) == "undefined" || linkPhone.trim() == "") 
		{ 
			swal("联系电话不能为空！");
			return;
		}
		else {
			var reg = /^1(3|4|5|7|8)\d{9}$/;
			 if (!reg.test(linkPhone)) {
				 swal("联系电话格式错误！");
				 return;
			 }
		}
		if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
		{ 
			swal("乙方法定代表人或代理人不能为空！");
			return;
		}
		if (!signTime || typeof(signTime) == "undefined" || signTime.trim() == "") 
		{ 
			swal("签订日期不能为空！");
			return;
		}
		if (!startTime || typeof(startTime) == "undefined" || startTime.trim() == "") 
		{ 
			swal("合同开始执行日期不能为空！");
			return;
		}if (!endTime || typeof(endTime) == "undefined" || endTime.trim() == "") 
		{ 
			swal("合同截至日期不能为空！"); 
			return;
		}
		if (endTime <= startTime) 
		{ 
			swal("时间先后顺序选择错误！"); 
			return;
		}
		if (!isClassified || typeof(isClassified) == "undefined" || isClassified.trim() == "") 
		{ 
			swal("是否保密不能为空！");
			return;
		}
		if (!classifiedLevel || typeof(classifiedLevel) == "undefined" || classifiedLevel.trim() == "") 
		{ 
			swal("保密等级不能为空！");
			return;
		}
		else {
			parame.contractCode = contractCode;
			parame.contractName = contractName;
			parame.signAddress = signAddress;
			parame.address = address;
			parame.companyID = companyID;
			parame.companyName = companyName;
			parame.oppositeMen = oppositeMen;
			parame.linkPhone = linkPhone;
			parame.startTime = startTime;
			parame.endTime = endTime;
			parame.employeeID = employeeID;
			parame.employeeName = employeeName;
			parame.signTime = signTime;
			//parame.contractAmount = contractAmount;
			parame.isClassified = isClassified;
			parame.classifiedLevel = classifiedLevel;
			
			$.ajax({
			  url:'contractController/updContract.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
				  	case -2:swal("不存在该检测项目！");
			  			break;
			  		case -4:swal("检测项目名与检测项目ID不相符！");
			  			break;
					case 1:swal("修改成功！");
						setTimeout(goback, 1000);
						break;
					case 0:swal("修改失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
			  }
			});
		}
	}
}

function checknum(obj)
{   
	if(/^\d+\.?\d{0,2}$/.test(obj.value)){
		obj.value = obj.value;
	}else{
    	obj.value = obj.value.substring(0,obj.value.length-1);
    }
}

//新增合同细项方法 
function addItem(){
	
	var parame = {};
	var fineItemCode = $('#add_fineItemCode').val();
	var testProjectID = $('#add_testProjectName').attr("name");
	var testProjectName = $('#add_testProjectName').attr("title");
	var isOutsourcing = $("input[name='isOutsourcing1']:checked").val();
	var calculateType = $("input[name='calculateType1']:checked").val();
	var number = $('#add_number').val();
	var price1 = $('#add_price1').val();
	var hour = $('#add_hour').val();
	var price2 = $('#add_price2').val();
	var departmentName1 = $('#add_departmentName1').val();
	var departmentName2 = $('#add_departmentName2').val();
	var remarks = $('#add_remarks').val();
	
	if (!fineItemCode || typeof(fineItemCode) == "undefined" || fineItemCode.trim() == "") 
	{ 
		swal("合同细项编号不能为空！"); 
		return;
	}
	if (!testProjectName || typeof(testProjectName) == "undefined" || testProjectName.trim() == "") 
	{
		swal("检测项目不能为空！"); 
		return;
	}
	if(isOutsourcing == 0){
		if (!departmentName1 || typeof(departmentName1) == "undefined" || departmentName1.trim() == "") 
		{
			swal("检测单位不能为空！");
			return;
		}
		parame.isOutsourcing = isOutsourcing;
		parame.departmentID = departmentName1;
	}
	if(isOutsourcing == 1){
		if (!departmentName2 || typeof(departmentName2) == "undefined" || departmentName2 .trim() == "") 
		{
			swal("外包单位不能为空！");
			return;
		}
		parame.isOutsourcing = isOutsourcing;
		parame.departmentID = departmentName2;
	}
	
	if(calculateType == 0){
		if (!number || typeof(number) == "undefined" || number.trim() == "") 
		{ 
			swal("数量/台不能为空！");
			return;
		}
		if (!price1 || typeof(price1) == "undefined" || price1.trim() == "") 
		{ 
			swal("每台单价/元不能为空！");
			return;
		}
		parame.calculateType = calculateType;
		parame.number = number;
		parame.price = price1;
		parame.hour = 0;
		parame.money = number * price1;
	}
	if(calculateType == 1){
		if (!hour || typeof(hour) == "undefined" || hour.trim() == "") 
		{ 
			swal("时间/时不能为空！");
			return;
		}
		if (!price2 || typeof(price2) == "undefined" || price2.trim() == "") 
		{ 
			swal("小时单价/元不能为空！");
			return;
		}
		parame.calculateType = calculateType;
		parame.hour = hour;
		parame.number = 0;
		parame.price = price2;
		parame.money = hour * price2;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
		parame.remarks = "";
	}
		parame.contractID = $('#edit_contractID').val();
		parame.fineItemCode = fineItemCode;
		parame.testProjectID = testProjectID;
		parame.testProjectName = testProjectName;
		parame.remarks = remarks;
		
		$.ajax({
			  url:'contractFineItemController/addContractFineItem.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
				  	case -2:swal("不存在该公司名的公司！");
				  		break;
				  	case -4:swal("公司名与公司ID不相符！");
			  			break;
					case 1:swal("新增成功！");
						$('#addContractItemModal').modal('hide');
						setTimeout(refresh, 1000);
						break;
					case 0:swal("新增失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
				  refresh();
			  }
		});	
}
function delFileItem(id,fineItemCode){
	if (confirm("删除合同细项：" + fineItemCode)) {
		var parame = {};
		parame.itemID = id;
		parame.contractID = $('#edit_contractID').val();
		$.ajax({
			  url:'contractFineItemController/delContractFineItem.do',
			  type:"post",
			  data:parame,
			  success:function(o){
				  if(o == 1){
					  swal("删除成功！");
				  }else{
					  swal("删除失败");
				  }
				  setTimeout(refresh, 1000);
			  }
		});
	}else{
		return;
	}
}

//编辑合同细项方法 
function editItem(){
	
	var parame = {};
	var fineItemCode = $('#edit_fineItemCode').val();
	var testProjectID = $('#edit_testProjectName').attr("name");
	var testProjectName = $('#edit_testProjectName').attr("title");
	var isOutsourcing = $("input[name='isOutsourcing2']:checked").val();
	var calculateType = $("input[name='calculateType2']:checked").val();
	var number = $('#edit_number').val();
	var price1 = $('#edit_price1').val();
	var hour = $('#edit_hour').val();
	var price2 = $('#edit_price2').val();
	var departmentName1 = $('#edit_departmentName1').val();
	var departmentName2 = $('#edit_departmentName2').val();
	var remarks = $('#edit_remarks').val();
		
	if (!fineItemCode || typeof(fineItemCode) == "undefined" || fineItemCode.trim() == "") 
	{ 
		swal("合同细项编号不能为空！"); 
		return;
	}
	if (!testProjectName || typeof(testProjectName) == "undefined" || testProjectName.trim() == "") 
	{
		swal("检测项目不能为空！"); 
		return;
	}
	if(isOutsourcing == 0){
		if (!departmentName1 || typeof(departmentName1) == "undefined" || departmentName1.trim() == "") 
		{
			swal("检测单位不能为空！");
			return;
		}
		parame.isOutsourcing = isOutsourcing;
		parame.departmentID = departmentName1;
	}
	if(isOutsourcing == 1){
		if (!departmentName2 || typeof(departmentName2) == "undefined" || departmentName2 .trim() == "") 
		{
			swal("外包单位不能为空！");
			return;
		}
		parame.isOutsourcing = isOutsourcing;
		parame.departmentID = departmentName2;
	}
	
	if(calculateType == 0){
		if (!number || typeof(number) == "undefined" || number.trim() == "") 
		{ 
			swal("数量/台不能为空！");
			return;
		}
		if (!price1 || typeof(price1) == "undefined" || price1.trim() == "") 
		{ 
			swal("每台单价/元不能为空！");
			return;
		}
		parame.calculateType = calculateType;
		parame.number = number;
		parame.price = price1;
		parame.hour = 0;
		parame.money = number * price1;
	}
	if(calculateType == 1){
		if (!hour || typeof(hour) == "undefined" || hour.trim() == "") 
		{ 
			swal("时间/时不能为空！");
			return;
		}
		if (!price2 || typeof(price2) == "undefined" || price2.trim() == "") 
		{ 
			swal("小时单价/元不能为空！");
			return;
		}
		parame.calculateType = calculateType;
		parame.hour = hour;
		parame.number = 0;
		parame.price = price2;
		parame.money = hour * price2;
	}
		parame.ID = $('#edit_fineItemID').val();
		parame.contractID = $('#edit_contractID').val();
		parame.fineItemCode = fineItemCode;
		parame.testProjectID = testProjectID;
		parame.testProjectName = testProjectName;
		parame.remarks = remarks;
		
		$.ajax({
			  url:'contractFineItemController/updContractFineItem.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
				  	case -2:swal("不存在该检测项目！");
				  		break;
				  	case -4:swal("检测项目名与检测项目ID不相符！");
			  			break;
					case 1:swal("修改成功！");
						$('#editContractItemModal').modal('hide');
						setTimeout(refresh, 1000);
						break;
					case 0:swal("修改失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
			  }
		});	
}

$('.form_datetime_edit_Time').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    format: 'yyyy年mm月dd日'
});
	
