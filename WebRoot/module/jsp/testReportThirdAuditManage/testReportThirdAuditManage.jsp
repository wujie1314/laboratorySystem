<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>签发人报告审核</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/testReportManage/testReportManage.css">
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/sweetalert.min.js"></script>
<script src="module/js/alert.js"></script>
<script src="assets/js/autoPage.js"></script>

<style>
.content button {
	margin-left: 26px;
}

.audtiAgreement {
	width: 100%;
	margin: 10px auto;
}
.signature,.stamp{
 margin-top:20px;
}

.audtiAgreement label,.signature label,.stamp label {
	float: left;
	width: 20%;
	margin-top: 10px;
}

#Img1,#Img2 {
	height: 140px;
	width: 250px;
	cursor: pointer;
}

#PassReason {
	resize: none;
	width: 75%;
	height: 150px;
}

#rejectReason {
	resize: none;
	width: 90%;
	height: 200px;
}
</style>
</head>

<body>
	<div class="content">
		<div class="searchArea">
			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>交接单号:</label> <input type="text" name="transitreceiptNumber"
						id="transitreceiptNumber" class="form-control"
						aria-describedby="basic-addon1" placeholder="请输入交接单查找">
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>委托单位:</label> <input type="text" name="client" id="client"
						class="form-control" aria-describedby="basic-addon1"
						placeholder="请输入委托单位查找">
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>报告名称:</label> <input type="text" name="reportName"
						id="reportName" class="form-control"
						aria-describedby="basic-addon1" placeholder="请输入报告名称查找">
				</div>
			</div>

			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">委托时间:</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" name="beginTime" id="beginTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择委托开始时间"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>

				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">至:</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" name="endTime" id="endTime" size="16"
							type="text" value="" readonly="true" placeholder="请选择委托结束时间">
						<span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>

				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>审核状态:</label> <select class="form-control" name="selectPart"
						id="selectPart">
						<option value="3">所有情况</option>
						<option value="0">待审核</option>
						<option value="1">审核通过</option>
						<option value="2">驳回</option>
					</select>
				</div>

			</div>
		</div>


		<div class="buttonGroup">
			<div>
				<button type="button" class="btn btn-primary glyphicon " onclick="search()">查询</button>
				&nbsp;
				<button type="button" class="btn btn-primary glyphicon " onclick="checkReport()">查看</button>
				&nbsp;
				<button type="button" class="btn btn-primary glyphicon " onclick="filelDown()">下载</button>
				&nbsp;
				<button type="button" class="btn btn-primary glyphicon " onclick="refresh()">刷新</button>
			</div>
		</div>
	</div>
	
	<div id="thirdAuditPassModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:600px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close"></button>
					<h4 class="modal-title">
						<strong>填写审核通过意见</strong>
					</h4>
				</div>
				<div class="modal-body">
					<hr />
					<div class="audtiAgreement">
						<span id="PassTestReportID" style="display:none"></span>
						 <span id="PassTaskID" style="display:none"></span> 
						 <span id="PassFileName" style="display:none"></span>
						<label>审核意见:</label>
						<textarea id="PassReason" class="form-control" style="overflow-y:scroll"></textarea>
					</div>
					<div class="signature">
						<label>电子签名:</label>
					    <img id="Img1"  src="module/img/file/defaultPhoto.jpg"
							data-holder-rendered="true"/>
							
						 <input id="singnatureImg"
							type="file" name="files" id="files" onchange="previewImage(this,'Img1')"
							accept="image/png, image/gif, image/jpg, image/jpeg"
							style="width:66px;height:25px;position:absolute;left:10px;top:155px;opacity: 0;filter: alpha(opacity = 0);" />
				       
					</div>
					<div class="stamp">
						<label>电子签名:</label>
						 <img id="Img2"  src="module/img/file/defaultPhoto.jpg"
							data-holder-rendered="true""/>
						<input id="stampImg" type="file" name="files" id="files" onchange="previewImage(this,'Img2')"
							accept="image/png, image/gif, image/jpg, image/jpeg" 
							style="width:66px;height:25px;position:absolute;left:10px;top:155px;opacity: 0;filter: alpha(opacity = 0);" />
					</div>
					<hr />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="keyishangchuan"
						onclick="thirdAuditPassSure()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	
	<div id="thirdAuditRejectModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:450px; ">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close"></button>
					<h4 class="modal-title">
						<strong>填写驳回意见</strong>
					</h4>
				</div>
				<div class="modal-body">
					<hr />
					<div class="row" style="text-align:center">
						<span id="testReportID" style="display:none"></span> <span
							id="taskID" style="display:none"></span> <span id="fileName"
							style="display:none"></span>
						<textarea id="rejectReason" class="form-control"
							style="overflow-y:scroll">
					 </textarea>
					</div>
					<hr />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"
						onclick="">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 表格 -->
	<table id="table">

	</table>

	<script src="module/js/testReportThirdAuditManage/testReportThirdAuditManage.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script> 
    <script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
	<script type="text/javascript">
		$('.form_datetime').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			format : 'yyyy-mm-dd hh:ii:ss'
		});
		$("#Img1").click(function() {
			$('#singnatureImg').click();
		});
		$("#Img2").click(function() {
			$('#stampImg').click();
		});
	</script>
</body>
</html>
