package Dao;

import valuebean.User;

public interface UserDao {
    public boolean login(User user);
    public boolean register(User user);
}
