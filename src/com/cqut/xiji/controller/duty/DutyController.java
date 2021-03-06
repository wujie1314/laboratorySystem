package com.cqut.xiji.controller.duty;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.service.duty.IDutyService;
import com.cqut.xiji.tool.util.PropertiesTool;

@Controller
@RequestMapping("/dutyController")
public class DutyController{
	
	@Resource(name="dutyService")
	IDutyService service;
	
	@RequestMapping("/getDutyWithPage")  
    @ResponseBody
    public JSONObject getDutyWithPage(String dutyCode,String dutyName,
			 int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getDutyWithPage(dutyCode,dutyName,limit,offset,order,sort);
		return JSONObject.fromObject(result);
		
	}
	@RequestMapping("/addDuty")  
    @ResponseBody
	public String addDuty(String dutyCode,String dutyName,String introduction){
		String result = service.addDuty(dutyCode,dutyName,introduction);
		return result;
		
	}
	@RequestMapping("/addText")  
    @ResponseBody
	public String addText(String dutyCode,String dutyName){
		String result = service.addText(dutyCode,dutyName);
		return result;
		
	}
	@RequestMapping("/delDuty")
	@ResponseBody
	public String delDuty(String IDs){
		String result = service.delDuty(IDs);
		return result;
	}
	@RequestMapping("/updDuty")
	@ResponseBody
	public String updDuty(String ID,String dutyCode,String dutyName,String introduction){
		String result=service.updDuty(ID, dutyCode, dutyName, introduction);
		return result;
		
	}
	
	/**
	 * @description 获取所有的职务名
	 * @author Hzz
	 * @date 2016年12月7日 晚上20:06:01
	 * @return
	 */
	@RequestMapping("/getAllDutyName")
	@ResponseBody
	public String getAllDutyName(){
		List<Map<String, Object>> result = service.getAllDutyName();
		return JSONArray.fromObject(result).toString();
	}
	@RequestMapping("/dutyExportExcel")
	@ResponseBody
	public void dutyExportExcel(HttpServletRequest request,HttpServletResponse response) {
		service.dutyExportExcel(request, response);
	}
	@RequestMapping("/dutyGoExcel")
	@ResponseBody
	public void dutyGoExcel(@RequestParam("files") CommonsMultipartFile file) {
		PropertiesTool pe = new PropertiesTool();
		String path = pe.getSystemPram("filePath") + "\\" + file.getOriginalFilename();// 文件路径
		
		File directoryCreate = new File(path);
		if (!directoryCreate.exists()) {
			directoryCreate.mkdirs();
		}
		try {
			file.transferTo(directoryCreate);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		service.dutyGoExcel(path);
	}
}
