package uz.neft.liting.payload;


public class ApiResponseObject extends ApiResponse {
    private Object object;

    public ApiResponseObject(String message, boolean success, Object object) {
        super(message, success);
        this.object = object;
    }

    public ApiResponseObject(HttpStatus status, Object object) {
        super(status);
        this.object = object;
    }

    public ApiResponseObject(String message, HttpStatus status, Object object) {
        super(message,status);
        this.object = object;
    }

    public ApiResponseObject(String message, boolean success, HttpStatus status, Object object) {
        super(message, success,status);
        this.object = object;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
