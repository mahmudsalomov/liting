package uz.neft.liting.payload;


public class ApiResponse {
    private String message;
    private boolean success;
    private HttpStatus status;
//    private static final AppAuthor author=new AppAuthor();

    public ApiResponse() {
    }

    public ApiResponse(HttpStatus status) {
        this.status = status;
        this.message = status.getDescription();
        this.success= status.getCode() < 400;
    }

    public ApiResponse(String message, HttpStatus status) {
        this.status = status;
        this.message = message;
        this.success= status.getCode() < 400;
    }

    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
        if (success) {
            this.status=HttpStatus.OK;
        } else {
            this.status=HttpStatus.Conflict;
        }
    }

    public ApiResponse(String message, boolean success, HttpStatus status) {
        this.message = message;
        this.success = success;
        this.status = status;
    }

//    public static AppAuthor getAuthor() {
//        return author;
//    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
