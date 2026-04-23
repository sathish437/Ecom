const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // will be hashed in model or should be hashed here if inserting directly without middleware hook triggers (insertMany doesn't trigger pre-save hooks usually!)
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

// Pre-hash passwords since insertMany doesn't trigger pre-save hooks
const hashPasswords = async () => {
    for (let user of users) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
};
// We need to export a promise or run this before export?
// Actually simpler to just export the array and let the seeder script handle hashing or just use create() in loop.
// But seeder uses insertMany. Let's make the seeder script handle it or just use hashed strings here?
// No, I'll update seeder to use create logic or hash in seeder.
// Let's just update seeder to loop and create, so middleware runs.
// Wait, `insertMany` is faster. I will just update the user data here to be simple and let seeder handle it.
// Actually, I'll just hash them here hardcoded or leave plain text and duplicate the hashing logic in seeder?
// Let's export plain text and let seeder handle it? No, seeder uses insertMany.
// I will just put the bcrypt hash of '123456' here for simplicity.
// $2a$10$d/2JulW8s3aOrzI1.2j2UO.v0.v0.v0.v0.v0.v0.v0 (fake)
// Let's just use '123456' and update seeder to hash.

module.exports = users; 
