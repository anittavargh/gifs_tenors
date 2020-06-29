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
        var platform = req.body.platform
        var scenario = req.body.scenario

        if(platform == "gify"||platform == null){
            gifSearch.query(scenario)
            .then(
                gifUrl => //console.log(gifUrl)
                res.send({"gifys":gifUrl})
            )
        }
        if(platform == "tenor"){
            Tenor.Search.Random(scenario, "1").then(Results => {
                Results.forEach(Post => {
                      res.send({"tenor":`Item ${Post.id} (Created: ${Post.created}) @ ${Post.url}`});
                });
            })
        }
    }
    catch(error){
        console.log(error)
    }
}