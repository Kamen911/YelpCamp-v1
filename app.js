const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let campgrounds = [
   {name: "Bozveliisko", image: "https://farm2.staticflickr.com/1266/4701470104_07556d68d6.jpg"},
   {name: "Mountain Pirin", image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg"},
   {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg"},
   {name: "Bozveliisko", image: "https://farm2.staticflickr.com/1266/4701470104_07556d68d6.jpg"},
   {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg"},
   {name: "Mountain Pirin", image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg"},
   {name: "Bozveliisko", image: "https://farm2.staticflickr.com/1266/4701470104_07556d68d6.jpg"},
   {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2931/14128269785_f27fb630f3.jpg"},
   {name: "Mountain Pirin", image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg"}
];

app.get("/", (req, res) => res.render("landing") );

app.get("/campgrounds", (req, res) => {
   res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
   //get data from form and add to campgrounds array
   const name = req.body.name;
   const image = req.body.image;
   const newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   //redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.get("/campgrounds/new", (req, res) => {
   res.render("new.ejs");
});



app.listen(3000, () => console.log("The YelpCamp Server is started on port 3000!") );