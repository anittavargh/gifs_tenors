const {Client } = require('pg')

module.exports.delete = async(req,resp)=>{
    try{

        var url = req.body.url;

        const client = new Client({
            "user": process.env.DB_USER,
            "host": process.env.DB_HOST,
            "database": process.env.DB_DATABASE,
            "password": process.env.DB_PASSWORD,
            "port": process.env.DB_PORT
        })
        client.connect(console.log("successfully connected!!!!!"))
        const query = `DELETE FROM urls_table WHERE url = '${url}'`; 
        client.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data deleted successful'); 
            resp.send({"deleted url":url}) 
            client.end();

        })
    }catch(error){
        console.log(error)
    }
}
  