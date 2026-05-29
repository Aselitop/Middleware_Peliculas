import { Sequelize } from "sequelize";

const db=new Sequelize(process.env.DATABASE_URL,{
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
