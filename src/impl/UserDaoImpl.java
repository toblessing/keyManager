package impl;

import Dao.UserDao;
import dbc.DataBaseConnection;
import valuebean.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDaoImpl implements UserDao {
    private DataBaseConnection dbc=null;
    public UserDaoImpl(){
        dbc = new DataBaseConnection();
    }
    @Override
    public boolean login(User user) {
        boolean result = false;

        String sql = "select * from user where username=? and password=?";
        ResultSet rs=dbc.exeQuery(sql, user.getUsername(),user.getPassword());
        try {
            if (rs.next()) {
                result = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    @Override
    public boolean register(User user) {
        return false;
    }
}
