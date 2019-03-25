package impl;

import Dao.ScriptDao;
import dbc.DataBaseConnection;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ScriptDaoImpl implements ScriptDao {
    private DataBaseConnection dbc = null;

    public ScriptDaoImpl() {
        dbc = new DataBaseConnection();
    }

    @Override
    public boolean setScript(String name, String content) {
        boolean result = false;
        String sql = "insert into script values(?,?)";
        try {
            result = dbc.exeUpdate(sql, name, content);
        } catch (SQLException e) {
            sql = "update script set content=? where name=?";
            try {
                result = dbc.exeUpdate(sql, content, name);
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
        }

        return result;
    }

    @Override
    public String getScript(String name) {
        String result = null;

        String sql = "select content from script where name=? limit 1";
        ResultSet rs = dbc.exeQuery(sql, name);
        try {
            if (rs.next()) {
                result = rs.getString("content");
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
}
