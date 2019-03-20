package valuebean;

import java.util.List;

public class Result {

    private boolean isSuccess = false;
    private String msg = null;
    private List data = null;

    public Result() {
    }

    public Result(boolean isSuccess, String msg, List data) {
        this.isSuccess = isSuccess;
        this.msg = msg;
        this.data = data;
    }

    public boolean isIsSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List getData() {
        return data;
    }

    public void setData(List data) {
        this.data = data;
    }
}
