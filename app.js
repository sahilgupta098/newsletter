const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){



  res.sendFile(__dirname+'/signup.html');
});

app.post('/',function(req,res){
  console.log("postMethod");

  // for Authetication purpose
  mailchimp.setConfig({
    apiKey: "ecce9330b636103f635f2dc20aa723b9-us18",
    server: "us18",
  });

  // async function runCon() {
  //   const response = await mailchimp.ping.get();
  //   console.log("mailchimp",response);
  // }

  // runCon();
  const newsLetterData = req.body;
console.log(newsLetterData);
  const listId = "71e2a3ea4e";
  const subscribingUser = {
    firstName: newsLetterData.fName,
    lastName: newsLetterData.lName,
    email: newsLetterData.eName
  };

  async function run() {
  try{
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    console.log(
      "Successfully added contact as an audience member. The contact's id is"
    );
      res.sendFile(__dirname+'/success.html');
  }
  catch(e){
    console.log('e,',e.status);
      res.sendFile(__dirname+'/failure.html');
  }
  }
  run();


});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is listening from Port 3000");
})


// test@mail.com


// API key
// ecce9330b636103f635f2dc20aa723b9-us18
//
// Aud idea
// 71e2a3ea4e
