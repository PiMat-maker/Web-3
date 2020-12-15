package main.java.postgres;

import com.sun.rowset.JdbcRowSetImpl;
import main.java.entities.FormBean;
import org.jetbrains.annotations.NotNull;

import javax.sql.rowset.JdbcRowSet;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DataBase {

    //private final String userName = "postgres";
    //private final String password = "1";
    //private final String connectionUrl = "jdbc:postgresql://localhost:5433/postgres";
    private final String userName = "s289240";
    private final String password = "ooc973";
    private final String connectionUrl = "jdbc:postgresql://pg:5432/studs";
    private Connection con;
    private Class aClass;

    public DataBase() {
        try {
            aClass = Class.forName("org.postgresql.Driver");
            con = DriverManager.getConnection(connectionUrl, userName, password);
        } catch(SQLException | ClassNotFoundException e){
            System.out.println("Database error");
            e.printStackTrace();
        }
    }

    public void setCon(Connection con) {
        this.con = con;
    }

    public Connection getCon() {
        return con;
    }
    
    public void save(@NotNull FormBean bean) throws SQLException {
        String sql = "INSERT INTO results (x, y, R, result, workTime, currentTime) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = getCon().prepareStatement(sql);
        preparedStatement.setDouble(1, bean.getX());
        preparedStatement.setDouble(2, bean.getY());
        preparedStatement.setDouble(3, bean.getR());
        preparedStatement.setBoolean(4, bean.isResult());
        preparedStatement.setLong(5, bean.getWorkTime());
        preparedStatement.setString(6, bean.getCurrentTime());
        preparedStatement.executeUpdate();
    }

    public void clearSql() throws SQLException {
        String sql = "DELETE from results";
        Statement statement = con.createStatement();
        statement.execute(sql);
    }

    public List<FormBean> getList() {
        List<FormBean> list = new ArrayList<>();
        try{
            JdbcRowSet result = new JdbcRowSetImpl(getCon());
            result.setCommand("SELECT * FROM results");
            result.execute();
            while (result.next()) {
                FormBean bean = new FormBean();
                bean.setX(result.getDouble("x"));
                bean.setY(result.getDouble("y"));
                bean.setR(result.getDouble("R"));
                bean.setResult(result.getBoolean("result"));
                bean.setWorkTime(result.getLong("workTime"));
                bean.setCurrentTime(result.getString("currentTime"));
                list.add(bean);
            }
        } catch (SQLException e) {
            System.out.println("Upload list exception");
            e.printStackTrace();
        }
        return list;
    }

}