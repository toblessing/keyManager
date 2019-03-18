package Dao;

import valuebean.ActivationCode;

import java.util.List;

public interface ActivationCodeDao {
    public boolean activation(String code);
    public ActivationCode addKey(float exdate, int number,String user,String admin);
    public List<ActivationCode> select();
    public  ActivationCode checkCode(String code);
    public ActivationCode renewalCode(ActivationCode activationCode,float day);
}
