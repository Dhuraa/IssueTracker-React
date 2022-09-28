const express = require("express");

/***GRAPHQL */
const { ApolloServer } = require("apollo-server-express");

// ! = mandatory
const typeDefs = `
    type issue{
        Id:  String!
        Status: String!
        Owner: String!
        Effort: Int
        Create: String
        Due: String
        Title: String!
    }
    type Query {
        about: String!
        issueList:[issue!]
    }
    type Mutation {
        setAboutMessage(message: String!): String
    }`;

    let aboutMessage = "Hello From GRAPHQL";
    let tempIssues = [
        {Id:1, Status:"Assigned", Owner:"Person-A", Effort:14, Create: new Date("2022-09-20"), Due: new Date("2022-09-23"), Title:"This is the First Issue"},
        {Id:2, Status:"Resolves", Owner:"Person-B", Effort:10, Create: new Date("2022-09-19"), Due: new Date("2022-09-24"), Title:"This is the Second Issue"},
       ];

    const resolvers = {
      Query: {
        about: () => aboutMessage,
        issueList 
      },
      Mutation: {
        setAboutMessage,
      },
    };

    function issueList(){
        return tempIssues;
    }

    function setAboutMessage(_, { message }) {
      return (aboutMessage = message);
    }

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

/*** */

const app = express();

const port = "3000";
app.use(express.static("./public"));

server.start()
    .then(function(){
        server.applyMiddleware({ app, path: '/graphql',cors:true })
    })

app.get("/", function (req, res) {
    res.render("index.html");
});

app.listen(port, function () {
    console.log("WebServer is running");
});

//npm run compile
//npm install --save-dev @babel/cli @babel/core @babel/preset-react
