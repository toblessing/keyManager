package dbc;

import bean.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DataBaseConnection {
    PreparedStatement pstm = null;
    private Connection conn = null;
    private ResultSet rs = null;

    public DataBaseConnection() {
        conn = new DBConnection().getConn();
    }

    public boolean exeUpdate(String sql, Object... parame) throws SQLException {
        boolean flag = false;

        PreparedStatement pstm = conn.prepareStatement(sql);
        int i = 1;
        for (Object o : parame) {
            pstm.setObject(i, o);
            i++;
        }
        int count = pstm.executeUpdate();
        if (count > 0)
            flag = true;

        return flag;
    }

    public ResultSet exeQuery(String sql, Object... parame) {
        try {
            pstm = conn.prepareStatement(sql);
            int i = 1;
            for (Object o : parame) {
                pstm.setObject(i, o);
                i++;
            }
            rs = pstm.executeQuery();
        } catch (SQLException e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return rs;
    }

    public void close() {
        try {
            if (rs != null) rs.close();
            if (pstm != null) pstm.close();
            if (conn != null) conn.close();
        } catch (SQLException e) {
            // TODO: handle exception]
            e.printStackTrace();
        }
    }
}
