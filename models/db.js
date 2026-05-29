import { Sequelize } from "sequelize";

const db=new Sequelize({
    storage:'peliculas.sqlite',
    dialect:'sqlite'
})


async function init(){
    db.sync()
}

init()

export default db