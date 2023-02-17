import jwt from 'jsonwebtoken';

export default function ckLogin(req, res) {
    if (req.method === 'POST') {
        // Verify JWT token
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'process.env.JWT_SECRET');

            const time = Date.now() / 1000

            const { exp, userId } = decodedToken

            const end = parseInt(exp - time)

            if (end <= 25) { //ถ้าเวลาไกล้จะหมด ให้ส่ง token ใหม่กลับไป
                const token = jwt.sign({ userId }, 'process.env.JWT_SECRET', { expiresIn: '30s' });
                return res.status(200).json({ refreshToken: token });
            }

            // Process request with authorized user
            res.status(200).json({ userId, end });
            // res.status(200).json({ message: `Authorized user ID: ${userId}` });
        } catch (err) {
            // Unauthorized access
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Method not allowed
        res.status(405).json({ message: 'Not Method POST' }).end();
    }
}