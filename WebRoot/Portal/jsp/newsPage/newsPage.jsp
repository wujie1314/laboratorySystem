<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN">
  <head>
    <base href="<%=basePath%>">
    
    <title>新闻中心</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" href="module/css/bootstrap-theme.min.css">	
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/newsPage/newsPage.css">

	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
    <script src="module/js/bootstrap-table-zh-CN.js"></script> 
    <script src="Portal/js/newsPage/newsPage.js"></script>
    <script src="Portal/js/comment/comment.js"></script>
  </head>
  <body>
    <input type = "text" id ="name" name="name" style="display: none" value=<%=session.getAttribute("clientNo")%>></input>
         <!-- 隐藏的新闻ID -->
         <input type="text" style="display: none;" value="" id="firstNewsID">
 		  <!-- 登陆DIV -->
	  	 <div id="login_box" class="login_box">
        <a class="close">×</a>
	    <div class="show_logo container2">
		    <a class="logo_small" href="Portal/jsp/homePage/homePage.jsp">
		    <img src="Portal/images/show_logo.png"/></a>
	    </div>
	    <form class="form-signin container2" role="form" action="#" method="post">
			<input type="text" class="form-control" id="clientNo" name="clientNo" placeholder="用户名" autocomplete="off" />
			<input type="text" class="form-control" id="password" name="password" placeholder="密码" onfocus="this.type='password'"/>
		   <!--<div class="check_box">
			    <input type="checkbox" value="remember-me"> 记住密码
				<a href="Portal/jsp/register/findPassword.jsp" ><small>找回密码</small></a>
			</div>-->
		    <button class="btn btn-lg btn-block" type="button" onclick="login()">登录</button> 
		    <a href="Portal/jsp/register/findPassword.jsp" class="findPassword"><small>找回密码</small></a>
	    </form>
    </div>
    <div id="imask"></div>
        <!-- 目录DIV -->
        <div class="header content">
	    <div class="logoline">
	        <a class="logo" href="Portal/jsp/homePage/homePage.jsp"><img src="Portal/images/logo.png"/></a>
	    </div>
	    <div class="line">
	        <ul class="tittleline clearfloat">
	            <li class="item"><a class="item-inner" href="Portal/jsp/homePage/homePage.jsp">首页</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/classicCase/ClassicCase.jsp">典型案例</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/newsPage/newsPage.jsp">新闻中心</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/selfApplication/applied.jsp">自助申请</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/onlineQuery/onlineQuery.jsp">在线查询</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/aboutUs/Introduction.jsp">关于我们</a></li>
	        </ul>
	        <div class="right-linne clearfloat" id="loginDivOne">
	            <a class="register" href="Portal/jsp/register/register.jsp">注册</a>
		        <a class="h-login" href="javascript:void(0)" onclick="document.getElementById('home-login').scrollIntoView();">登录</a>
	        </div>
	        <div class="right-linne clearfloat" id="loginDivTwo" style="display: none;">
	            <p class="h-login"  onclick="logout()">注销</p>
	            <p class="register" id="loginA"></p>
	              <div class="ulDiv" id="ulDiv" style="display: none">
				   <ul>
				       <li><a href="Portal/jsp/register/personalCenter.jsp">个人信息</a></li>
				       <li><a href="Portal/jsp/register/changePassword.jsp">修改密码</a></li>
				       <li><a href="Portal/jsp/register/findPassword.jsp">找回密码</a></li>
				     </ul>
                  </div>
	        </div>
	    </div>
    </div>
    <!-- 背景DIV -->
	<div class="banner clearfloat content">
	   <img src="Portal/images/pressCenter_banner.png"/>
	</div>
	
	<!-- 中间内容DIV -->
    <div id="middle" class="clearfloat content contentbody">
    			<!-- 新闻中心左侧展示框 -->
                <div id="contentbody_left">
                    <div class="contentlistfirst">
                    	<div id="contentlist1">
                            <div class="contentlist2">
                                <span style="color:#198ac8;font-size:16px;">新闻</span><span>中心</span>
                            </div>
                        </div>
                        <div class="contentlist">
	                        <a class="specialtitle" href="Portal/jsp/newsPage/newsPage.jsp">新闻中心咨询报告</a>
	                    </div>
                    </div>
                </div>
                
                <!-- 新闻中心展示列表 -->
                <div class="contentbody_right">
                    <div class="contenttitle">新闻中心咨询报告</div>
                    <div class="firstNews">
                       <div class="firstNewsLeft">
                         <img alt="" src="Portal/images/newsPic.png" id="firstNewsPhoto">
                       </div>
                       <div class="firstNewsRight">
                         <div class="firstNewsTitle"><h3 id="newsTitle"></h3></div>
                         <div class="firstNewsContent"><p id="newsContent"></p></div>
                         <div class="firstNewsButton">
                            <button type="button" class="btn btn-primary" onclick="NewsDetails()">查看更多>></button>
                         </div>
                       </div>
                    </div>
                    <div id="table_before">
	                  	<div id="contenttable">
	                    	<table id="table">
	                        </table>
	                    </div> 
                    </div>
                </div>
        </div>
        <div class="footer content">
		    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
		    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>
       </div>
  </body>
</html>
