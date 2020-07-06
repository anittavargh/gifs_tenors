const { Client } = require('pg');
const  gifSearch = require('gif-search');
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
            gifSearch.query(scenario)
            .then(function async (gifUrl){
                var url = gifUrl
                res.send({"gifys":url})
                const query = ` INSERT INTO de0g72m4jmt53o (scenario,platform,url)
                               VALUES ('${scenario}','${platform}','${url}') `;
                client.query(query, (err, res) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Data insert successful');
                    client.end();
                });
            })
        }



        //tenor returning
        if(platform == "tenor"){
            Tenor.Search.Random(scenario, "1").then(Results => {
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
