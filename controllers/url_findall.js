const {Client } = require('pg')

module.exports.findall = async(req,res)=>{
    try{
        const client = new Client({
            "user": process.env.DB_USER,
            "host": process.env.DB_HOST,
            "database": process.env.DB_DATABASE,
            "password": process.env.DB_PASSWORD,
            "port": process.env.DB_PORT
        })
        client.connect(console.log("successfully connected!!!!!"))
        client.query('SELECT * FROM urls_table ', (err, result) => {
            if(result){
                console.log(result)
                res.send(result)
            }
            else{
                console.log(err)
            }
            client.end()
        })
    }catch(error){
        console.log(error)
    }
}
  