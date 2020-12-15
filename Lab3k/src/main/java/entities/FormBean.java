package main.java.entities;

import com.sun.istack.internal.NotNull;
import main.java.postgres.DataBase;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static java.lang.Math.ceil;
import static java.lang.Math.floor;

@Named("form")
@ApplicationScoped
public class FormBean implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double x;
    private double plotX;

    @NotNull
    private double y;
    private double plotY;

    private double R;
    private boolean result;
    private long workTime;
    private String currentTime;
    private DataBase dataBase;

    @PostConstruct
    public void init(){
        dataBase = new DataBase();
    }

    public void setId(long id) { this.id = id; }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double R) {
        this.R = R;
    }

    public void setPlotX(double plotX) {
        this.plotX = plotX;
    }

    public void setPlotY(double plotY) {
        this.plotY = plotY;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public void setCurrentTime(String currentTime) { this.currentTime = currentTime; }

    public void setDataBase(DataBase dataBase) { this.dataBase = dataBase; }

    public void setWorkTime(long workTime) { this.workTime = workTime; }

    public long getId() { return id; }

    public double getX() { return x; }

    public double getY() {
        return y;
    }

    public double getR() {
        return R;
    }

    public double getPlotX() { return plotX;  }

    public double getPlotY() { return plotY; }

    public boolean isResult() {
        return result;
    }

    public long getWorkTime() { return workTime; }

    public String getCurrentTime() { return currentTime; }

    public DataBase getDataBase() { return dataBase; }

    public List<FormBean> getList(){
        return dataBase.getList();
    }

    public void addCoordinates(){
        workTime = System.currentTimeMillis();
        saveRequest(plotX, plotY);
    }

    public void addPoint(){
        workTime = System.currentTimeMillis();
        saveRequest(x, y);
    }

    public FormBean makeBean(double x, double y){
        FormBean bean = new FormBean();
        bean.setR(R);
        bean.setX(x);
        bean.setY(y);
        bean.setResult(checkArea(x, y));
        bean.setWorkTime(System.currentTimeMillis() - workTime);
        SimpleDateFormat sDFormat = new SimpleDateFormat("HH:mm:ss");
        bean.setCurrentTime(sDFormat.format(Calendar.getInstance().getTime()));
        return bean;
    }

    public boolean checkArea(double x, double y){
        boolean res = false;

        //for circle
        if (ceil(x) <= 0 && ceil(y) <= 0 && Double.compare(x*x + y*y, R*R/4) <= 0){
            System.out.println(x*x + y*y);
            res = true;
        }

        //for rectangle
        if (floor(x) >= 0 && Double.compare(x, R) <= 0 && ceil(y) <= 0 && Double.compare(y, -R) >= 0){
            System.out.println(y);
            res = true;
        }

        //for triangle
        if (ceil(x) <= 0 && floor(y) >= 0 && Double.compare(-x + y, R/2) <= 0){
            System.out.println(x + y);
            res = true;
        }

        result = res;
        return res;
    }

    public void saveRequest(double x, double y){
        if (R <= 0) return;
        try {
            dataBase.save(makeBean(x, y));
        } catch (SQLException e) {
            System.out.println("Saving exception");
            e.printStackTrace();
        }
    }

    public String toMainPage(){
        return "main";
    }

    public String toWelcomePage(){
        return "index";
    }

}
