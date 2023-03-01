import express from "express";
import mongoose from "mongoose";
// import routersBlogs from "./routes/blog-router.js";
import routersBlogs from "./routes/blog-router.js";
import router from "./routes/user-routes.js";

const app = express();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blogs", routersBlogs);


mongoose.connect("mongodb://admin:Fv67C7Wp73sx7Y7@ac-qxefqiy-shard-00-00.260bhbo.mongodb.net:27017,ac-qxefqiy-shard-00-01.260bhbo.mongodb.net:27017,ac-qxefqiy-shard-00-02.260bhbo.mongodb.net:27017/MyBlogApps?ssl=true&replicaSet=atlas-z1tcqw-shard-0&authSource=admin&retryWrites=true&w=majority"
).then(() => app.listen(5000))
.then(() => 
    console.log('Connect to database and listenng to localhost 5000')
)
.catch((err) => console.log("Error List: -> ", err));


// "mongoURI": "mongodb://user:<password>@cluster0-shard-00-00-lo1zs.mongodb.net:27017,cluster0-shard-00-01-lo1zs.mongodb.net:27017,cluster0-shard-00-02-lo1zs.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
// const data = [];
// app.use("/api", (req, res, next) => {
//     // res.send("Hello Pakistani people wanna meet eva angelina and sybil also");
//     res.send(data);
// });

// app.use("/starts", (req, res, next) => {
//     res.send("sybil and eve angelina most beautiful x actress");
// });

// mongoose.connect(
//     "43.246.227.149://admin:IulK50EhYMzvhqqr@cluster0.0fgmxqy.mongodb.net/Blog?retryWrites=true&w=majority"
// )
// .then(() => app.listen(5000))
// .then(() => 
//     console.log("Connect to Database and listening to localhost 50000")
// )
// .catch((err) => console.log("Show errir" + err));

//mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// app.listen(5000);

// Database links: -> mongodb+srv://admin:<password>@cluster0.260bhbo.mongodb.net/?retryWrites=true&w=majority
//Password: -> Fv67C7Wp73sx7Y7