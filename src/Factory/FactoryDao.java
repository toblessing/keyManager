package Factory;

import Dao.ActivationCodeDao;
import Dao.ScriptDao;
import Dao.UserDao;
import impl.ActivationCodeDaoImpl;
import impl.ScriptDaoImpl;
import impl.UserDaoImpl;

public class FactoryDao {
    public static UserDao getUserDaoInstance(){
        return new UserDaoImpl();
    }
    public  static ActivationCodeDao getActivationCodeDaoInstance(){
        return new ActivationCodeDaoImpl();
    }

    public static ScriptDao getScriptDaoInstance() {
        return new ScriptDaoImpl();
    }

}
