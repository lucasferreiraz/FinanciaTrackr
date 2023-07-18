package com.enterprise.api.financiatrackr.controllers.exceptions;

public class Error {

    private String userMessage;
    private String developerMessage;

    public Error() {
    }

    public Error(String userMessage, String developerMessage) {
        this.userMessage = userMessage;
        this.developerMessage = developerMessage;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public String getDeveloperMessage() {
        return developerMessage;
    }
    
}
