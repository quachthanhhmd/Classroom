import sequelize from "./config/db";
import User from "./models/user.model";


(async() => {
    sequelize.sync({
        force: true
    })

})();
