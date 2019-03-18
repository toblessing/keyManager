package bean;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	private static final String DBDRIVER = "com.mysql.cj.jdbc.Driver";
	private static final String DBURL = "";
	private static final String USER = "";
	private static final String PASSWORD = "";
	private Connection conn = null;

	public DBConnection() {
		// TODO Auto-generated method stub

		try {
			Class.forName(DBDRIVER).newInstance();
			conn = DriverManager.getConnection(DBURL, USER, PASSWORD);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Connection getConn() {
		return conn;
	}
}
