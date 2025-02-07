const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const AppleStrategy = require('passport-apple');

// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3010/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    // In a real app, you would save user to database
    return done(null, profile);
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3010/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Twitter Strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: "/auth/twitter/callback"
}, async (token, tokenSecret, profile, done) => {
    return done(null, profile);
}));

// Microsoft Strategy
passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "http://localhost:3010/auth/microsoft/callback",
    scope: ['user.read', 'profile', 'email', 'openid']
}, async (accessToken, refreshToken, profile, done) => {
    // In a real app, you would save user to database
    return done(null, profile);
}));

// Apple Strategy
passport.use(new AppleStrategy({
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    privateKeyLocation: process.env.APPLE_PRIVATE_KEY_LOCATION,
    callbackURL: "http://localhost:3010/auth/apple/callback",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, idToken, profile, done) => {
    // Apple sends user data only on first login
    const userData = req.body && req.body.user ? JSON.parse(req.body.user) : {};
    profile.name = userData.name;
    profile.email = userData.email;
    
    return done(null, profile);
}));
