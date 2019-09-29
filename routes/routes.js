// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Welcome to the Node.js Express REST API!'
        });
    });

    // Display all users
    app.get('/user', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/user/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result[0]);
        });
    });

    // Add a new user
    app.post('/user', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send('User added with ID: ${result.insertId}');
        });
    });

    // Update an existing user
    app.put('/user/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/user/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;