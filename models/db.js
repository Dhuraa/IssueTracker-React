const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://dhura:rQCFIBYI1DVQbXzT@cluster0.h9um4ab.mongodb.net/IssueList?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.connection.on("connected", function(){
    console.log("Application is connected to Databse");
})
