<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>工作量统计</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	
	<link rel="stylesheet" href="module/css/changeACE.css" />
	 
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
   
   <style>
.list-searcher {
	min-width: 300px;
	height: 40px;
}

.list-searcher input {
	display: inline-block;
	margin-right: 20px;
	width: 200px;
}

.list-searcher span {
	display: inline-block;
	width: 90px;
}

.fixed-table-container .bs-checkbox {
	text-align: center;
	vertical-align: middle;
}

#searcherArea {
	min-width: 1300px;
}

.bootstrap-table {
	min-width: 1500px;
}

.list-searcher select {
	display: inline-block;
	width: 200px;
}

.input-group {
	margin-top: 10px;
}

.input-group .btn {
	margin-left: 3px;
}

.form-control {
	display: inline;
	width: 70%;
}

.row {
	margin-bottom: 10px;
}

.row label {
	width: 20%;
	min-width: 80px;
}

.timeLabelDiv {
	float: left;
	height: 34px;
	min-width: 80px;
}

.timeLabelDiv label {
	margin-top: 7px;
}

.timeChooseDiv {
	width: 70%;
	margin-top: 0px;
}

.input-group-addon {
	background-color: #fff;
}
</style>
  </head>
  
  <body>
 	 <div id="searcherArea">
  		<div class="row">
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label class="control-label">检测人员:</label>
				<input class="form-control input-group" id="detector">
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label class="control-label">样品名称:</label>
				<input class="form-control" id="sampleName">
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" id="search" class="btn btn-primary">查询</button>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-md-2 col-lg-3">
				<label class="control-label">样品编号:</label>
				<input class="form-control" id="factoryCode">
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label class="control-label">检测项目:</label>
				<input class="form-control" id="testProject">
			</div>
		</div>
		<hr/>
		<!-- 表格 -->
 		<table id="table"></table>
 		
 		<br />
 		<hr />
 		<div class="row">
 			<div class="col-xs-11 col-md-11 col-lg-11"></div>
 			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" id="return" class="btn btn-primary">返回</button>
			</div>
		</div>
  	</div>
  </body>
  
  <script src="module/js/departmentSupervisorDesktop/workloadStatistical.js"></script>
</html>
