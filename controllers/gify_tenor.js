const { Client } = require('pg');
const axios = require('axios');
var GphApiClient = require('giphy-js-sdk-core')

// returns urls for the requested gifs and tenors respectively
module.exports.gify_tenor = async (req,res) =>{
    try{
        //from request.body
        var platform = req.body.platform
        var scenario = req.body.scenario
        var array = []
        
        //postgres client connection
        const client = new Client({
            "user": process.env.DB_USER,
            "host": process.env.DB_HOST,
            "database": process.env.DB_DATABASE,
            "password": process.env.DB_PASSWORD,
            "port": process.env.DB_PORT
          })
          client.connect(console.log("successfully connected!!!!!"))

        //gif returning and inserting into db
        if(platform == "gify"||platform == null){
            var cclient = GphApiClient(process.env.GIF_KEY)
            cclient.search('gifs', {"q": scenario,"limit":20})
            .then(function async (response){
                response.data.forEach((gifObject) => {
                var url = gifObject.url
                array.push(url)
                const query = ` INSERT INTO urls_table(scenario,platform,url)VALUES ('${scenario}','${platform}','${url}') `;
                    client.query(query, (err, res) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log('Data insert successful');
                        //client.end();
                    });                    
                })
                res.send({
                    "platform":platform,
                    "scenario":scenario,
                    urls:array
                })
            })
        }



        //tenor returning
        if(platform == "tenor"){
            axios.get(`https://api.tenor.com/v1/search?q='${scenario}'&key=${process.env.TENOR_KEY}&limit=20`)
            .then(function (response) {
                response.data.results.forEach((obj) => {
                    console.log(obj.url)
                    var url = obj.url
                    array.push(url)
                    const query = ` INSERT INTO urls_table(platform, scenario, url)VALUES ('${platform}','${scenario}','${url}') `;
                    client.query(query, (err, res) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Data insert successful');
                    });
                })
                res.send({
                    "platform":platform,
                    "scenario":scenario,
                    "urls":array
                })
          
            })
        }
    }catch(error){
        console.log(error)
    }
}
