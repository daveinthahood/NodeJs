import {Request, Response, NextFunction} from "express"
import passport from "./passport"

const authorize = (req, res) => {
    passport.authenticate("jwt", {session:false}, (err, user) => {
        if (!user || err) {
            res.status(401).json({msg:"Non autorizato"})
        } else {
            req.user=user;
            next();
        }
    })(req, res, next)
}

export default authorize