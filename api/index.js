import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apolloServer from "../graphql/index.js";
import dbConnect from "../utils/mongo.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { dirname, join } from "path";
import getDirName from "../utils/getDirName.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 7000;

const __dirname = getDirName(import.meta.url);

async function startServer() {
  await dbConnect();
  app.use(graphqlUploadExpress());
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.use("/", express.static(join(__dirname, "../../Public")));
  app.get("/", (req, res) => {
    res.send("<b>Hello</b>");
  });

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
}

startServer();

app.listen(port, () => {
  console.log(`Express ready at port ${port}`);
  console.log(`GraphQL running on ${apolloServer.graphqlPath}`);
});

export default app;
