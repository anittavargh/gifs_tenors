const {Client } = require('pg')

module.exports.find = async(req,res)=>{
    try{
        const client = new Client({
            user: 'osmeabpoxvwjjw',
            host: 'ec2-54-234-44-238.compute-1.amazonaws.com',
            database: 'de0g72m4jmt53o',
            password: '2543e3f93ab1a9043dc3b65bb5422bee4342bc0dad80388bb2a8a7abc7839381',
            port: 5432,
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
  