import { Sequelize } from "sequelize";

const db=new Sequelize('Peliculas','postgres','12345',{
    host:'localhost',
    dialect:'postgres'
})

async function init(){
    db.sync()
}

init()

export default db