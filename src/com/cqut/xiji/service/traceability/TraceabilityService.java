package com.cqut.xiji.service.traceability;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.traceability.Traceability;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class TraceabilityService extends SearchService implements
		ITraceabilityService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "traceability";
	}

	@Override
	public String getBasePrimaryKey() {
		return "traceability.ID";
	}

	@Override
	public int deleteTracebilityByID(String ID) {
		return entityDao.deleteByID(ID, Traceability.class);
	}

	@Override
	public int deleteTracebilityByIDs(String[] IDs) {
		return entityDao.deleteEntities(IDs, Traceability.class);
	}

	@Override
	public Map<String, Object> getTraceabilityWithPaging(int limit, int offset,
			String order, String sort, String condition) {

		int index = limit;
		int pageNum = offset / limit;
		String joinEntity = " left join qualityPlan on qualityPlan.ID = qualityPlanID "
				+ " left join equipment on equipment.ID = equipmentID "
				+ " left join department on department.ID = traceability.departmentID "
				+ " left join employee on employee.ID = traceability.employeeID "
				+ " left join fileinformation on fileinformation.belongtoID = traceability.id";

		Map<String, Object> map = getMap(index, pageNum, order, sort,
				condition, joinEntity);
		return map;
	}

	@Override
	public Boolean upload(HttpServletRequest request,
			HttpServletResponse response, ModelMap model) throws IOException {
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		// 得到上传的文件
		MultipartFile mFile = multipartRequest.getFile("file");
		System.out.println("mFile=" + mFile);
		// 得到上传服务器的路径
		String path = request.getSession().getServletContext()
				.getRealPath("/WEB-INF/");

		System.out.println(path);
		String filename = mFile.getOriginalFilename();
		String remark = request.getParameter("remark");
		int type;
		if (request.getParameter("type") == "自检") {
			type = 0;
		} else {
			type = 1;
		}

		String belongID = request.getParameter("belongID");
		if (filename == null || filename == "") {
			return false;
		}
		InputStream inputStream = mFile.getInputStream();
		byte[] b = new byte[1048576];
		int length = inputStream.read(b);
		path += "\\" + filename;
		// 文件流写到服务器端
		FileOutputStream outputStream = new FileOutputStream(path);
		outputStream.write(b, 0, length);
		inputStream.close();
		outputStream.close();
		String ID = EntityIDFactory.createId();
		FileInformation fr = new FileInformation();
		fr.setID(ID);
		fr.setBelongtoID(belongID);
		fr.setFileName(filename);
		fr.setPath(path);
		fr.setUploadTime(new Date());
		fr.setRemarks(remark);
		fr.setType(type);
		String result = this.saveFiles(fr);
		if (result == "true") {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public String saveFiles(FileInformation fr) {
		return baseEntityDao.save(fr) == 1 ? "true" : "false";
	}

	@Override
	public int getCountByCondition(String condition) {
		return entityDao.getCountByCondition(condition, Traceability.class);
	}

	@Override
	public int saveTracebility(Traceability traceability, HttpSession session) {
		// 获取用户名ID以及该用户的部门ID
		String userID = (String) session.getAttribute("ID");// 获取用户名ID
		if (userID != null && !userID.trim().equals("")) {
			List<Employee> ens = entityDao.getByCondition(" ID = '" + userID
					+ "'", Employee.class);
			if (ens.size() > 0) {
				traceability.setDepartmentID(ens.get(0).getDepartmentID());// 设置部门ID
			}
		}
		traceability.setQualityPlanID(session.getAttribute("qualiyPlanId")
				.toString());
		traceability.setEmployeeID(userID);// 设置制定者（用户名）ID
		traceability.setAuditState("0");// 0-未审核，1-审核通过，2-不通过
		return entityDao.save(traceability);
	}

	@Override
	public int updateTracebilityByID(Traceability traceability) {
		// 更新建议则把审核状态设置未审核
		traceability.setAuditState("0");
		return entityDao.updatePropByID(traceability, traceability.getID());
	}

	@Override
	public int auditTracebilityByID(Traceability traceability) {
		try {
			if (traceability.getReason() != null
					|| !traceability.getReason().trim().toString().equals("")) {
				traceability.setReason(URLDecoder.decode(
						traceability.getReason(), "utf-8"));
			}

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return entityDao.updatePropByID(traceability, traceability.getID());
	}

	public Map<String, Object> getMap(int index, int pageNum, String order,
			String sort, String condition, String joinEntity) {
		List<Map<String, Object>> result = originalSearchWithpaging(
				new String[] {
						"distinct traceability.ID as traceabilityID",// ID

						"qualityPlanID",// 计划类型ID
						"qualityPlan.type AS qualityPlanType",// 计划类型

						"equipmentID",// 设备ID
						"equipmentName",// 设备名称
						"equipmentCode",// 仪器编号

						"model",// 规格型号

						"traceability.departmentID as departmentID",// 部门ID
						"departmentName",// 部门名称

						"employeeName",// 制定者
						"traceability.employeeID as employeeID",// 制定者ID

						"correctOrgan",// 校准服务机构
						"period",// 本次校准周期
						"DATE_FORMAT(nowCorrectYear,'%Y-%m-%d') as nowCorrectYear", // 本年度校准时间
						"DATE_FORMAT(nextCorrectYear,'%Y-%m-%d') as nextCorrectYear",// 下次校准时间
						"reason",// 不通过原因
						"auditState",// 审核状态
						"result",// 对溯源结果的确认
						"certificateNumber",// 证书编号
						"traceability.remark as remark"// 备注
				}, "traceability", joinEntity, null, condition, false, null,
				sort, order, index, pageNum);

		for (Map<String, Object> m : result) {
			String ID = m.get("traceabilityID").toString();
			String Tcondition = "traceabilityID='" + ID + "'";
			List<Map<String, Object>> ens = baseEntityDao.getByCondition(
					Tcondition, "calibrationValue");
			m.put("Name1", JSONArray.fromObject(ens));
		}

		int count = getForeignCountInFull("traceability.ID", joinEntity, null,
				condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	public Map<String, Object> getTraceabilityResultWithPaging(int limit,
			int offset, String order, String sort, String condition) {
		int index = limit;
		int pageNum = offset / limit;
		String joinEntity = "join qualityPlan on qualityPlan.ID = qualityPlanID "
				+ "join equipment on equipment.ID = equipmentID "
				+ "join department on department.ID = traceability.departmentID "
				+ "join employee on employee.ID = traceability.employeeID "
				+ "left join fileinformation on fileinformation.belongtoID = traceability.ID";
		Map<String, Object> map = getMap(index, pageNum, order, sort,
				condition, joinEntity);
		return map;
	}
}
