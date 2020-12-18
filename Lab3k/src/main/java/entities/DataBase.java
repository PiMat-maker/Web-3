package main.java.entities;

import main.java.entities.FormBean;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Named;
import javax.persistence.*;
import javax.transaction.NotSupportedException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Named("DB")
@ApplicationScoped
public class DataBase implements Serializable {

    @PersistenceContext(unitName = "manager")
    private EntityManager entityManager;

    @Resource
    UserTransaction userTransaction;

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

    public void setEntityManager(EntityManager entityManager) { this.entityManager = entityManager; }

    public EntityManager getEntityManager() { return entityManager; }

    @PostConstruct
    public void init(){
        formBean = new FormBean();
    }

    public void save(FormBean formBean) {
        formBean.setWorkTime(System.currentTimeMillis());
        formBean.getResult();
        formBean.setWorkTime(System.currentTimeMillis() - formBean.getWorkTime());
        SimpleDateFormat sDFormat = new SimpleDateFormat("HH:mm:ss");
        formBean.setCurrentTime(sDFormat.format(Calendar.getInstance().getTime()));
        try {
            userTransaction.begin();
            entityManager.persist(formBean);
            userTransaction.commit();
        }catch (Exception e){
            System.out.println("UserTransaction Failed save");
        }
    }

    public List<FormBean> getList(){
        return new ArrayList<>((entityManager.createQuery("select res from FormBean res", FormBean.class)).getResultList());
    }

    public void clear(){
        try {
            userTransaction.begin();
            entityManager.createQuery("delete from FormBean res");
            userTransaction.commit();
        }catch (Exception e){
            System.out.println("UserTransaction Failed clear");
        }
    }

    public void addCoordinates(){
        save(new FormBean (plotX, plotY, formBean.getR()));
    }

    public void addPoint(){
        save(new FormBean(formBean.getX(), formBean.getY(), formBean.getR()));
    }

    public String toMainPage(){
        return "main";
    }

    public String toWelcomePage(){
        return "index";
    }
}