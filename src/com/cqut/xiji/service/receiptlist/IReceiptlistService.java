package com.cqut.xiji.service.receiptlist;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface IReceiptlistService {
 
			

	Map<String, Object> getReceiptlistWithPagingInTaskAssign(int limit, int offset, String sort, String order,String receiptlistCode,String contractCode,String companyName,String linkMan,String acceptSampleTime_start,String acceptSampleTime_end,int state,int assignState);
	List<Map<String, Object>> getReceiptlistInfoInTaskAssign(String ID);
	/**
	 * 
	 * @author wzj
	 * @date 2016年10月22日 上午10:38:22
	 * @return
	 */
	Map<String, Object> getReceiptlistWithPaging(String reCode, String coCode,String companyName, String reType, String linkMan,String startTime, String endTime, String state, int limit,
			int offset, String order, String sort); //获取交接单信息
	Map<String, Object> getTasklistByReID(String reID,int limit,
			int offset, String order, String sort);//获取交接单中样品信息
	Map<String, Object> getReFiletByReID(String reID, int limit, int offset,
			String order, String sort);//获取交接单中文件信息
	String addTaskAndSampleWithEdit(String taskID ,String sampleID, String sampleCode, //新增或者编辑任务
			String sampleName, String sampleStyle, String testProject,
			String unit, String require, String reID, String state);
	String deleteTaskByID(String taskID); //删除任务
	String saveSubmitReceipt(String reID, String saveState, String addState,  //保存和提交交接单
			String companyName, String address, String linkMan,
			String startTime, String endTime, String linkPhone,
			String accordingDoc, String coID);
	Map<String, Object> addReceiptList(String coID, String proID, String state,HttpServletRequest request); //新增交接单
	Map<String, Object> getReceiptByReID(String reID); //获取交接单信息通过交接单ID
	String delReceiptlist(String reID); //删除交接单
	
	public String updReceiptlistInforInReturn(String ID,String linkMan,String createTime,String linkPhone);
	List<Map<String, Object>> getReceiptlistInformationInView(String ID);
	List<Map<String,Object>> getReceiptlistInforInReturn(String ID);
	Map<String, Object> addReceiptListInReturn(); //新增退还交接单
	
	public String updRelistInforInReturn(String reID,String conID,String linkMan,String createTime,String linkPhone);
	
}
