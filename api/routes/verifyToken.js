import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

/*Verifying the token (1)*/
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authentication failed" })
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if (error) {
            return res.status(403).json({ error: "Invalid or expired token" })
        }
        req.user = user;
        next()
    })
}

/*Verifying the user using userId or isAdmin*/
/*We are getting id from the token we assigned to it */
export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.params.id === req.user.id || req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json({ error: "Invalid user" })
        }
    })
}

/*Verifying user using isAdmin */
export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json({ error: "Invalid user" })
        }
    })
}