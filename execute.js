const db = require('./conf/database.js');

exports.getReply = async (message) => {
    let query = await db.execute("SELECT id FROM messages WHERE message = \"" + message.content + "\" and type = 1");

    if(query){
        query = await db.execute("SELECT getReply(" + query[0].id + ") AS reply");
        if(query){
            message.channel.send(query[0].reply);
        }
    }    
}