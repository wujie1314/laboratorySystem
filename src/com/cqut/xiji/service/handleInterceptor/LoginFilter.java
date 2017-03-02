package com.cqut.xiji.service.handleInterceptor;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginFilter implements Filter {

	public static final String index_page = "/laboratorySystem/index.jsp";
	public static final String login_page = "/laboratorySystem/login.jsp";
    
	
	@Override
	public void doFilter(ServletRequest servletRequest,
			ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		String currentURL = request.getRequestURI();
		String ctxPath = request.getContextPath();
		
		// 除掉项目名称时访问页面当前路径
		String targetURL = currentURL.substring(ctxPath.length());
		HttpSession session = request.getSession(false);
		
		System.out.println("targetURL: " + targetURL + "\nctxPath: " + ctxPath
				+ "\ncurrentURL: " + currentURL);
		if(targetURL.indexOf("login.jsp") > 0  || targetURL.equals("/") ){ //登录页面放过
		/*	System.out.println("the is login.jsp");*/
			filterChain.doFilter(request, response); //继续下一步 ，不然这里有问题
		}
		else{
			// 在不是登陆页面时，再进行判断，如果不是登陆页面也没有session则跳转到登录页面，
			if (session == null || session.getAttribute("EMPLOYEEID") == null) {
				response.sendRedirect(login_page);
				return;
			} else {
				// 这里表示正确，会去寻找下一个链，如果不存在，则进行正常的页面跳转
				filterChain.doFilter(request, response);
				return;
			}
		}
		
	}
	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}