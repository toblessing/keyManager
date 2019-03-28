package impl;

import Dao.ActivationCodeDao;
import bean.Tools;
import dbc.DataBaseConnection;
import valuebean.ActivationCode;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.Math.random;


public class ActivationCodeDaoImpl implements ActivationCodeDao {
    private DataBaseConnection dbc = null;

    public ActivationCodeDaoImpl() {
        dbc = new DataBaseConnection();
    }

    @Override
    public boolean activation(String code) {
        String sql = "select * from activationcode where code=? ";
        ResultSet rs = dbc.exeQuery(sql, code);
        try {
            if (rs.next()) {
                Date nowDate = new Date();
                Date date = rs.getDate("exdate");
                if (date.getTime() > nowDate.getTime()) {
                    int available = rs.getInt("available");
                    int unavailable = rs.getInt("unavailable");
                    if (available > 0) {
                        sql = "update activationcode set available=?,unavailable=? where code=?";
                        return dbc.exeUpdate(sql, available - 1, unavailable + 1, code);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public ActivationCode addKey(float exdate, int number, String user, String admin) {
        String code = user + randomCode();
        String exdateStr = Tools.getDateOfAfter(exdate);
        ActivationCode activationCode = null;
        String sql = "";
        while (true) {
            sql = "select * from activationcode where code=?";
            ResultSet rs = dbc.exeQuery(sql, code);
            try {
                if (!rs.next()) {
                    break;
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            code = user + randomCode();
        }
        sql = "insert into activationcode values(?,?,?,?,?,?)";
        try {
            if (dbc.exeUpdate(sql, code, exdateStr, user, admin, number, 0)) {
                activationCode = new ActivationCode(code, exdateStr, user, admin, number, 0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return activationCode;
    }

    private String randomCode() {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            result.append((int) (random() * 10));
        }
        return result.toString();
    }

    @Override
    public List<ActivationCode> select() {
        List<ActivationCode> result = new ArrayList<>();

        String sql = "select * from activationcode order by exdate desc";
        ResultSet rs = dbc.exeQuery(sql);
        if (rs == null) {
            return result;
        }
        try {
            while (rs.next()) {
                result.add(new ActivationCode(
                        rs.getString(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getInt(5),
                        rs.getInt(6),
                        rs.getTimestamp(2).getTime() > (new Date()).getTime()
                ));
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
    public ActivationCode checkCode(String code) {
        ActivationCode result = null;
        String sql = "select * from activationcode where code=? ";
        ResultSet rs = dbc.exeQuery(sql, code);
        try {
            if (rs.next()) {
                Date nowDate = new Date();
                Date date = rs.getTimestamp("exdate");
                if (date.getTime() > nowDate.getTime()) {
                    result = new ActivationCode(
                            rs.getString(1),
                            rs.getString(2),
                            rs.getString(3),
                            rs.getString(4),
                            rs.getInt(5),
                            rs.getInt(6),
                            rs.getTimestamp(2).getTime() > (new Date()).getTime()
                    );
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public ActivationCode renewalCode(ActivationCode activationCode,float day) {
        ActivationCode result = null;

        //获取原来的code数据
        ActivationCode lastCode = checkCode(activationCode.getActivationCode());
        int available=activationCode.getAvailable();
        String exdate;
        String sql = "update activationcode set exdate=?,available=available+? where code=?";

        if (lastCode != null) {
            exdate = Tools.getDateAddDay(lastCode.getExdate(), day);
            System.out.println("not null");
        } else {
            exdate = Tools.getDateOfAfter(day);
            System.out.println("is null");
        }

        try {
            if (dbc.exeUpdate(sql, exdate, available, activationCode.getActivationCode())) {
                result = checkCode(activationCode.getActivationCode());
                System.out.println("修改成功");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }
}
