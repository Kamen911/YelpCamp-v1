const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("landing") );

app.get("/campgrounds", (req, res) => {
   let campgrounds = [
      {name: "Bozveliisko", image: "https://farm2.staticflickr.com/1266/4701470104_07556d68d6.jpg"},
      {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg"},
      {name: "Mountain Pirin", image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg"}
   ]

   res.render("campgrounds", {campgrounds: campgrounds});
});


app.listen(3000, () => console.log("The YelpCamp Server is started on port 3000!") );