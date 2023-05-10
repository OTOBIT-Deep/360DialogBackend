var express = require("express");
var app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.post("/async", async (req, res) => {
  const body = {
    username: req.body.username,
    password: req.body.password,
  };
  

  try {
    console.log("khihkhkhkh9999");
    const response = await axios.post(
      "https://hub.360dialog.io/api/v2/token",
      body
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.post("/api", async (req, res) => {
//   console.log(req.body, "kkkk");//
  const token = req.body.token;
  const channel_id = req.body.channel_id;
  const partner_id = req.body.partner_id;


  try {
    const response = await axios.post(
      `https://hub.360dialog.io/api/v2/partners/${partner_id}/channels/${channel_id}/api_keys`,
      {
       
      },
      {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }
    );
console.log(response.data, "ooooo");
    
    res.status(200).json({data: response.data});
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
