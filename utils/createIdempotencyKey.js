const { v4: uuidv4 } = require('uuid');


export default function generateIdempotencyKey(email, eventId) {
    const uniqueIdentifier = uuidv4().replace(/-/g, ''); // Remove hyphens
    const key = `${email}-${eventId}-${uniqueIdentifier}`;
    return key.substring(0, 50); // Ensure the key is <= 50 characters
}