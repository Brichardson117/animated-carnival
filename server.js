const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express()



//HTML routes
app.get('/notes', (req, res) => {

})

app.get('*', (req, res) => {

})
//HTML routes end

//api routes
app.get('/api/notes', (req, res) => {

});


app.post('/api/notes', (req, res) => {
 fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedReviews = JSON.parse(data);

      // Add a new review
      parsedReviews.push(newReview);

      // Write updated reviews back to the file
      fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedReviews, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated reviews!')
      );
   }
 });
});
//api routes end



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})