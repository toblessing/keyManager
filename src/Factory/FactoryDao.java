package Factory;

import Dao.ActivationCodeDao;
import Dao.UserDao;
import impl.ActivationCodeDaoImpl;
import impl.UserDaoImpl;

public class FactoryDao {
    public static UserDao getUserDaoInstance(){
        return new UserDaoImpl();
    }
    public  static ActivationCodeDao getActivationCodeDaoInstance(){
        return new ActivationCodeDaoImpl();
    }

}
