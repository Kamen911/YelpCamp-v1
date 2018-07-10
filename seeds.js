const mongoose    = require('mongoose'),
      Campground  = require('./models/campground'),
      Comment    = require('./models/comment');

const data = [
   {
      name: "Good Morning",
      image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quam autem laborum perspiciatis quaerat vero hic quae. Est sequi mollitia, dolorem minus molestiae totam. Id ipsam, minus provident placeat unde magnam eius vero perspiciatis quaerat aspernatur deserunt, iusto voluptas! Iusto cupiditate voluptatem maxime culpa similique dignissimos ad quas ratione commodi quam alias mollitia voluptates at distinctio, nulla nostrum deleniti ut aliquid. Earum magnam in quos. At aliquam voluptatibus nihil. Voluptatum at beatae nulla et quidem nisi? Accusantium iure enim harum at quidem illum, laboriosam ducimus aliquid nam mollitia, ratione, reiciendis nesciunt consequuntur laudantium perferendis! Rerum placeat ducimus assumenda ipsam quia!"
   },
   {
      name: "Time for kids",
      image: "https://farm8.staticflickr.com/7246/7468674992_b8db31480e.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quam autem laborum perspiciatis quaerat vero hic quae. Est sequi mollitia, dolorem minus molestiae totam. Id ipsam, minus provident placeat unde magnam eius vero perspiciatis quaerat aspernatur deserunt, iusto voluptas! Iusto cupiditate voluptatem maxime culpa similique dignissimos ad quas ratione commodi quam alias mollitia voluptates at distinctio, nulla nostrum deleniti ut aliquid. Earum magnam in quos. At aliquam voluptatibus nihil. Voluptatum at beatae nulla et quidem nisi? Accusantium iure enim harum at quidem illum, laboriosam ducimus aliquid nam mollitia, ratione, reiciendis nesciunt consequuntur laudantium perferendis! Rerum placeat ducimus assumenda ipsam quia!"
   },
   {
      name: "Happy Nights",
      image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f0c37fafedb7bf_340.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quam autem laborum perspiciatis quaerat vero hic quae. Est sequi mollitia, dolorem minus molestiae totam. Id ipsam, minus provident placeat unde magnam eius vero perspiciatis quaerat aspernatur deserunt, iusto voluptas! Iusto cupiditate voluptatem maxime culpa similique dignissimos ad quas ratione commodi quam alias mollitia voluptates at distinctio, nulla nostrum deleniti ut aliquid. Earum magnam in quos. At aliquam voluptatibus nihil. Voluptatum at beatae nulla et quidem nisi? Accusantium iure enim harum at quidem illum, laboriosam ducimus aliquid nam mollitia, ratione, reiciendis nesciunt consequuntur laudantium perferendis! Rerum placeat ducimus assumenda ipsam quia!"
   }
]

function seedDB() {
   // Remove all campgrounds
   Campground.remove({}, (err) => {
      if(err) {
         console.log(err);
      }
      console.log("Removed Campgrounds!");
      // Add a few campgrounds
      data.forEach((seed) => {
         Campground.create(seed, (err, campground) => {
            if(err) {
               console.log(err)
            } else {
               console.log("Added a campground!");
               // Create a comments
               Comment.create(
                  {
                     text: "This place is great, but I wish there was internet",
                     author: "Homer"
                  }, (err, comment) => {
                     if(err) {
                        console.log(err);
                     } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                     }
                  });
            }
         });
      });
   });
};

module.exports = seedDB;