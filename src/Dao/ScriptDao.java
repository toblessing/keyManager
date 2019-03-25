package Dao;

public interface ScriptDao {
    public boolean setScript(String name, String content);

    public String getScript(String name);

}
