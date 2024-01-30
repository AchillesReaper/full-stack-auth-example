import env from 'dotenv'
import express from "express";
import cors from 'cors'
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

env.config();

const app = express();
const port = process.env.SERVER_PORT;

const localStrategy = new Strategy(
    (username, password, done) => {
        if (username === process.env.USER_NAME) {
            if (password === process.env.PASSWORD) {
                done(null, username)
            } else {
                done('password incorrent')
            }
        } else {
            done('User name incorrect')
        }
    }
)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use('local', localStrategy)

// a simple example demostratin cross origin sharing
app.get('/login', (req, res) => {
    res.send("you reach the backend")
})

// standard redirecting syntax
// app.post('/api/login', passport.authenticate('local', {
//     //redirect url can be external
//     successRedirect: process.env.SUCCESS_REDIRECT_URL,
//     failureRedirect: process.env.FAILURE_REDIRECT_URL
// }))


app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info, status) {
        if (err) { return next(err) }
        if (!user) { return res.json({ message: 'login_failed' }) }
        res.json({ message: 'login_success' })
    })(req, res, next);
});



app.get('/api/secret', (req, res) => {
    if (req.isAuthenticated()) {
        res.send("Secret: I got a unicorn")
    } else {
        res.send("You are unauthorised!")
    }
})

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})