const express = require('express');
const fs = require('fs');

const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//HTML routes
app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, './public/index.html'))
});
//HTML routes end

//api routes
app.get('/api/notes', (req, res) => {
 fs.readFile('./db/db.json', (req, res) => {
    if(results) {
        res.json(results)
    } else {
        res.send(404);
    };
    return results;
 })
});


app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add new note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),

        }; fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new review
                parsedNotes.push(newNote);

                // Write updated reviews back to the file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        });
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.json(response);
    } else {
        res.json('Error posting new note');
    }
});

app.delete('/api/notes/:id', (req, res) => {

})
//api routes end



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})