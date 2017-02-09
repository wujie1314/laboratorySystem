<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>检测报告管理</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css"
	href="module/css/testReportManage/testReportManage.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>

</head>

<body>
	<div class="content">
		<div class="searchArea">
			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>交接单号:</label> <input type="text" name="transitreceiptNumber"
						id="transitreceiptNumber" class="form-control"
						aria-describedby="basic-addon1">
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>委托单位:</label> <input type="text" name="client" id="client"
						class="form-control" aria-describedby="basic-addon1">
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>报告名称:</label> <input type="text" name="reportName"
						id="reportName" class="form-control"
						aria-describedby="basic-addon1">
				</div>
			</div>

			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">委托时间:</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" name="beginTime" id="beginTime"
							size="16" type="text" value="" readonly="true"> <span
							class="input-group-addon"><span
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
							type="text" value="" readonly="true"> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>审核状态:</label> <select class="form-control" name="selectPart"
						id="selectPart">
						<option value="5">所有情况</option>
						<option value="0">未提交</option>
						<option value="1">审核中</option>
						<option value="2">审核未通过</option>
						<option value="3">审核通过</option>
						<option value="4">归档</option>
					</select>
				</div>
			</div>
		</div>


		<div class="buttonGroup">
			<div style="text-align:center">
				<button type="button"
					class="btn btn-primary glyphicon glyphicon-search"
					onclick="search()">查询</button>
				&nbsp;
				<button type="button"
					class="btn btn-primary glyphicon glyphicon-eye-open"
					onclick="checkReport()">查看</button>
				&nbsp;
				<button type="button"
					class="btn btn-primary glyphicon glyphicon-align-justify"
					onclick="recoat()">合并</button>
				&nbsp;
				<button type="button"
					class="btn btn-primary glyphicon glyphicon-edit"
					onclick="recover()">重新覆盖</button>
			</div>
		</div>
	</div>

	<div id="recoverReport" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:450px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">重新覆盖检测报告</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="files" style="text-align:left">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								multiple="multiple">
							<div class="uploadFileText">
								<label>版本号码:</label> <input type="text" class="form-control"
									name="fileVersionNumber" id="fileVersionNumber"">
								</textarea>
							</div>
							<div class="uploadFileText">
								<label>版本信息:</label>
								<textarea rows="3" class="form-control" name="fileVersionInfo"
									id="fileVersionInfo"></textarea>
							</div>
							<div class="uploadFileText">
								<label>备注信息:</label>
								<textarea rows="3" class="form-control" name="fileRemarks"
									id="fileRemarks"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">

					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure" onclick="recoverSure()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal"
						onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
				</div>
			</div>
		</div>
	</div>

	<div id="sendReport" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:450px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">发送报告</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<span id="testReportID"></span> <label
							class="col-xs-4 col-md-4 col-lg-4 receiveManLabel">接受人:</label> <input
							class="col-xs-8 col-md-8 col-lg-8 form-control" type="text"
							name="receiveMan" id="receiveMan" />
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"
						onclick="sendReportSure()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>


	<!-- 表格 -->
	<table id="table">

	</table>



	<script src="module/js/testReportManage/testReportManage.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
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
	</script>
</body>
</html>