const { Client } = require('pg');
var GphApiClient = require('giphy-js-sdk-core')
var cclient = GphApiClient("Ofh1y8TzYh21zRIZbagBZzdcE3Fa9WgB")
const Tenor = require('tenorjs').client({
    "Key": "ME88GIAQY4GO", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

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
            Tenor.Search.Random(scenario, "20").then(Results => {
                Results.forEach(function async (Post){
                    var url = Post.url
                    console.log(url)
                    res.send({"tenors":url});
                    const query = ` INSERT INTO urls_table (scenario,platform,url)
                    VALUES ('${scenario}','${platform}','${url}') `;
                    client.query(query, (err, res) => {
                    if (err) {
                    console.error(err);
                    return;
                    }
                    console.log('Data insert successful');
                    client.end();
                    });
                });
            })
        }
    }
    catch(error){
        console.log(error)
    }
}
