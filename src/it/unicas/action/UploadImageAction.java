package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.Map;

public class UploadImageAction extends ActionSupport implements SessionAware {
    private File uploadFile;
    private String uploadFileContentType;
    private String uploadFileFileName;
    private String imagePath;
    private Map<String, Object> session;

    public File getUploadFile() {
        return uploadFile;
    }

    public void setUploadFile(File uploadFile) {
        this.uploadFile = uploadFile;
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

    @Override
    public String execute() {
        if (uploadFile == null) {
            addActionError("No file uploaded");
            System.out.println("No file uploaded");
            return ERROR;
        }

        // Define the path where the uploaded file will be saved
        String filePath = "/Users/huytrq/Workspace/unicas/DistributedProgramming/CareNet/images/";
        File fileToCreate = new File(filePath, this.uploadFileFileName);

        try {
            System.out.println("File to create: " + fileToCreate);
            // Copy the uploaded file to the specified location
            FileUtils.copyFile(this.uploadFile, fileToCreate);

            // Set the image path for the session
            // this.imagePath = "uploads/" + this.uploadFileFileName;

            // // Save the image path to the session
            // session.put("user.images_path", this.imagePath);
        } catch (IOException e) {
            e.printStackTrace();
            return ERROR;
        }

        return "patient";
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
