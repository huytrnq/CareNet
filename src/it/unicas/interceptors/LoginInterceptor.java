package it.unicas.interceptors;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import java.util.Map;

public class LoginInterceptor implements Interceptor {
    private static final long serialVersionUID = 1L;

    @Override
    public void destroy() {
        // TODO Auto-generated method stub
        System.out.println("LoginInterceptor destroy");
    }

    @Override
    public void init() {
        // TODO Auto-generated method stub
        System.out.println("LoginInterceptor init");
    }

    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {
        Map<String, Object> session = actionInvocation.getInvocationContext().getSession();
        String username = (String) session.get("username");
        if (username == null) {
            System.out.println("LoginInterceptor - User not logged in");
            return "login";
        }
        System.out.println("LoginInterceptor - User logged in");
        return actionInvocation.invoke();
    }
}
