const { Client } = require('pg');
const axios = require('axios');
var GphApiClient = require('giphy-js-sdk-core')
var cclient = GphApiClient("Ofh1y8TzYh21zRIZbagBZzdcE3Fa9WgB")

// returns urls for the requested gifs and tenors respectively
module.exports.gify_tenor = async (req,res) =>{
    try{
        //from request.body
        var platform = req.body.platform
        var scenario = req.body.scenario
        var array = []
        
        //postgres client connection
        const client = new Client({
            user: 'osmeabpoxvwjjw',
            host: 'ec2-54-234-44-238.compute-1.amazonaws.com',
            database: 'de0g72m4jmt53o',
            password: '2543e3f93ab1a9043dc3b65bb5422bee4342bc0dad80388bb2a8a7abc7839381',
            port: 5432,
          })
          client.connect(console.log("successfully connected!!!!!"))

        //gif returning and inserting into db
        if(platform == "gify"||platform == null){
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
            axios.get(`https://api.tenor.com/v1/search?q='${scenario}'&key=ME88GIAQY4GO&limit=20`)
            .then(function (response) {
                response.data.results.forEach((obj) => {
                    console.log(obj.url)
                    var url = obj.url
                    a.push(url)
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
