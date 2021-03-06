package common;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class database {
    public void savelog(Map<String, Object> json) throws IOException {
        MongoClient mongoClient= new MongoClient(new MongoClientURI("mongodb+srv://hieunm18:!23456@cluster0.kex4v.mongodb.net/admin"));
        MongoDatabase db= mongoClient.getDatabase("LTM");
        MongoCollection coll= db.getCollection("gpslogs");

        Filehandle filehandle = new Filehandle();
       // filehandle.savefile(json);
        Document filter= new Document("userId", json.get("userId"));
        FindIterable<Document> check = coll.find(filter);
        MongoCursor<Document> iterator = check.iterator();
        if(!iterator.hasNext()){
            Document doc= new Document("userId", json.get("userId"));
            List<Document> logLocation= new ArrayList<>();
            doc.append("logLocation", logLocation);
            coll.insertOne(doc);
        }

            Map<String, Object> maplocation= (Map<String, Object>) json.get("location");
            Document push= new Document("logLocation", new Document(maplocation));
            Document doc= new Document("$push", push);
            coll.updateOne(filter, doc);







     }
}
