package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import it.unicas.dao.UserDAO;
import it.unicas.dao.MedicalInfoDAO;

public class UploadImageAction extends ActionSupport implements SessionAware {
    private File uploadFile;
    private String uploadFileContentType;
    private String uploadFileFileName;
    private String imagingType;
    private String patientId;
    private Map<String, Object> session;

    public File getUploadFile() {
        return uploadFile;
    }

    public void setUploadFile(File uploadFile) {
        this.uploadFile = uploadFile;
    }

    public String getImagingType() {
        return imagingType;
    }

    public void setImagingType(String imagingType) {
        this.imagingType = imagingType;
    }

    public String getUploadFileContentType() {
        return uploadFileContentType;
    }

    public void setUploadFileContentType(String uploadFileContentType) {
        this.uploadFileContentType = uploadFileContentType;
    }

    public String getUploadFileFileName() {
        return uploadFileFileName;
    }

    public void setUploadFileFileName(String uploadFileFileName) {
        this.uploadFileFileName = uploadFileFileName;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    @Override
    public String execute() {
        if (uploadFile == null) {
            addActionError("No file uploaded");
            System.out.println("No file uploaded");
            return ERROR;
        }

        String username = (String) session.get("username");
        String role = (String) session.get("role");
        System.out.println("Image type: " + imagingType);

        // Define the path where the uploaded file will be saved
        String filePath;
        String new_file_name;
        if(imagingType == null) {
            filePath = "/Users/huytrq/Workspace/unicas/DistributedProgramming/CareNet/images/";
            new_file_name = username + "_profile_pic.png";
        } else {
            filePath = "/Users/huytrq/Workspace/unicas/DistributedProgramming/CareNet/images/";
            new_file_name = username + "_" + imagingType + ".png";
        }
        System.out.println("File path: " + filePath);
        System.out.println("New file name: " + new_file_name);
        System.out.println("Patient ID: " + patientId);

        File fileToCreate = new File(filePath, new_file_name);

        try {
            System.out.println("File to create: " + fileToCreate);
            // Copy the uploaded file to the specified location
            FileUtils.copyFile(this.uploadFile, fileToCreate);
            if (imagingType == null) {
                UserDAO.updateFields(username, new String[] {"profile_path"}, new String[] {new_file_name});
            } else {
                MedicalInfoDAO.updateFields(patientId, new String[] {imagingType + "_path"}, new String[] {new_file_name});
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ERROR;
        }

        return role;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
