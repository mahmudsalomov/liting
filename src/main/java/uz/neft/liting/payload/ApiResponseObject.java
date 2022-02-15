package uz.neft.liting.payload;


import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

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

    public ApiResponseObject(String message, boolean success, HttpStatus status, long totalElements, long totalPages, long page, Object object) {
        super(message, success, status, totalElements, totalPages, page);
        this.object = object;
    }

    public ApiResponseObject(Object object) {
        this.object = object;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    @Override
    public HttpEntity<?> response() {
        return ResponseEntity.status(org.springframework.http.HttpStatus.valueOf(getStatus().getCode())).body(this);
    }

    @Override
    public ApiResponseObject get() {
        return this;
    }
}
