package main.java.entities;

import com.sun.rowset.JdbcRowSetImpl;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import org.jetbrains.annotations.NotNull;

import javax.sql.DataSource;
import javax.sql.rowset.JdbcRowSet;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Named("DB")
@ApplicationScoped
public class DataBase implements Serializable {

    @Resource (mappedName="java:/PostgresDS")
    private DataSource dataSource;
    private Connection con;

    private FormBean formBean;
    private double plotX;
    private double plotY;

    public DataBase() {}

    public void setPlotX(double plotX) { this.plotX = plotX; }

    public void setPlotY(double plotY) { this.plotY = plotY; }

    public double getPlotX() { return plotX; }

    public double getPlotY() { return plotY; }

    public void setFormBean(FormBean formBean) { this.formBean = formBean; }

    public FormBean getFormBean() { return formBean; }

    @PostConstruct
    public void init() {
        formBean = new FormBean();
        try {
            con = dataSource.getConnection();
        } catch (SQLException e){
            System.out.println("Connection exception");
        }
    }

    public void setCon(Connection con) {
        this.con = con;
    }

    public Connection getCon() {
        return con;
    }

    public void save(@NotNull FormBean bean) throws SQLException {
        bean.setWorkTime(System.currentTimeMillis());
        String sql = "INSERT INTO results (x, y, R, result, workTime, currentTime) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = getCon().prepareStatement(sql);
        preparedStatement.setBoolean(4, bean.getResult());
        bean.setWorkTime(System.currentTimeMillis() - bean.getWorkTime());
        SimpleDateFormat sDFormat = new SimpleDateFormat("HH:mm:ss");
        bean.setCurrentTime(sDFormat.format(Calendar.getInstance().getTime()));

        preparedStatement.setDouble(1, bean.getX());
        preparedStatement.setDouble(2, bean.getY());
        preparedStatement.setDouble(3, bean.getR());
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


    public void addCoordinates(){
        try {
            save(new FormBean (plotX, plotY, formBean.getR()));
        } catch (SQLException e) {
            System.out.println("Save exception coordinate");
            e.printStackTrace();
        }
    }

    public void addPoint(){
        try {
            save(new FormBean(formBean.getX(), formBean.getY(), formBean.getR()));
        } catch (SQLException e) {
            System.out.println("Save exception point");
        }
    }

    public String toMainPage(){
        return "main";
    }

    public String toWelcomePage(){
        return "index";
    }
}