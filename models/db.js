import { Sequelize } from "sequelize";

const db=new Sequelize('postgresql://peliculas_siof_user:jeaVtMMlQUGLRiJKZeQxHdWSzzvlK0Ur@dpg-d8cj0c8g4nts738o46h0-a.virginia-postgres.render.com/peliculas_siof',{
    dialect:'postgres',
    protocol:'postgres',
    dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    },
    logging:false
})


async function init(){
    db.sync()
}

init()

export default db
