import {sequelize} from "./config/db";

(async () => {
    sequelize.sync({
        force: true
    })

})();
