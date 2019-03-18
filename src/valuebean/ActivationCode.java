package valuebean;

public class ActivationCode {
    private String activationCode;
    private String exdate;
    private String user;
    private String admin;
    private int available;
    private int unavailable;
    private boolean enabled;

    public ActivationCode(String activationCode, String exdate, String user, String admin, int available, int unavailable, boolean enabled) {
        this.activationCode = activationCode;
        this.exdate = exdate;
        this.user = user;
        this.admin = admin;
        this.available = available;
        this.unavailable = unavailable;
        this.enabled = enabled;
    }

    public ActivationCode(String activationCode, String exdate, String user, String admin, int available, int unavailable) {
        this.activationCode = activationCode;
        this.exdate = exdate;
        this.user = user;
        this.admin = admin;
        this.available = available;
        this.unavailable = unavailable;
    }

    public ActivationCode(String activationCode, int available) {
        this.activationCode = activationCode;
        this.available = available;
    }


    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getActivationCode() {
        return activationCode;
    }

    public void setActivationCode(String key) {
        this.activationCode = key;
    }

    public String getExdate() {
        return exdate;
    }

    public void setExdate(String exdate) {
        this.exdate = exdate;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getAdmin() {
        return admin;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public int getUnavailable() {
        return unavailable;
    }

    public void setUnavailable(int unavailable) {
        this.unavailable = unavailable;
    }
}
