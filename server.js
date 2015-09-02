var app = require("http").createServer(handler),
    fs = require("fs"),
    redis = require("redis"),
    co = require("./cookie.js"),
    PHPUnserialize = require('php-unserialize'),
    deasync = require('deasync');


app.listen(7070);

function handler(req, res){
   fs.readFile(__dirname + "/index.html", function(err, data){
        if(err){
            res.writeHead(500);
            return res.end("Error loading index.html");
        }else{
            res.writeHead(200);
            res.end(data);
        }
    });
    var call_session;
    var cookieManager = new co.cookie(req.headers.cookie);
    var clientSession = new redis.createClient();

/*PHPREDIS_SESSION = nome sessaos alva redis*/
function retornaSessao(callback) {
  clientSession.get("PHPREDIS_SESSION:"+cookieManager.get("nomedocookie"), function(error, result){
      sessaoCallcenter = JSON.parse(JSON.stringify(PHPUnserialize.unserializeSession(result)));
      sessaoCallcenter;
      callback();

  });
}
function getSessao() {
  call_session = sessaoCallcenter;
  }

retornaSessao(getSessao);
while(call_session === undefined) {
    require('deasync').sleep(100);
  }

console.log(call_session)
}