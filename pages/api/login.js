import jwt from 'jsonwebtoken';

export default function login(req, res) {
    // Authenticate user and retrieve user ID
    const userId = 'UserTest';

    // Generate JWT token
    const token = jwt.sign({ userId }, 'process.env.JWT_SECRET', { expiresIn: '30s' });

    // Return token to client
    res.status(200).json({ token });
}
