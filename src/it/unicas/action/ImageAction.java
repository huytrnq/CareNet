package it.unicas.action;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Base64;
import it.unicas.dao.UserDAO;

public class ImageAction extends ActionSupport {
    private String username;
    private String medicalImagePath;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setMedicalImagePath(String medicalImagePath) {
        this.medicalImagePath = medicalImagePath;
    }


    @Override
    public String execute() throws Exception {
        System.out.println(username);
        HttpServletResponse response = ServletActionContext.getResponse();
        
        String imagePath;
        if (username != null) {
            imagePath = UserDAO.getProfilePath(username);
        } else {
            imagePath = medicalImagePath;
        }
        if (imagePath == null) {
            return ERROR;
        }
        if (imagePath.equals("")) {
            return ERROR;
        }
        
        File imageFile = new File("/Users/huytrq/Workspace/unicas/DistributedProgramming/CareNet/images/" + imagePath);



        if (imageFile.exists()) {
            System.out.println("Image found: " + imageFile.getPath());
            FileInputStream fis = new FileInputStream(imageFile);
            response.setContentType("image/jpeg"); // Set appropriate content type based on your image type
            OutputStream out = response.getOutputStream();
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            fis.close();
            out.flush();
            out.close();
            return NONE;
        } else {
            System.out.println("Image not found: " + imageFile.getPath());
            response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404 error if image not found
            return ERROR;
        }

        // Example for serving image from database (Base64 encoded)
        // String base64Image = getBase64ImageFromDatabase(userId);
        // if (base64Image != null) {
        //     byte[] imageBytes = Base64.getDecoder().decode(base64Image);
        //     response.setContentType("image/jpeg"); // Set appropriate content type based on your image type
        //     OutputStream out = response.getOutputStream();
        //     out.write(imageBytes);
        //     out.flush();
        //     out.close();
        //     return NONE;
        // } else {
        //     response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404 error if image not found
        //     return ERROR;
        // }
    }

}
