const router = require('express').Router();
const passport = require('passport');

// Google Auth Routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
);

// Facebook Auth Routes
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
);

// Twitter Auth Routes
router.get('/twitter',
    passport.authenticate('twitter')
);

router.get('/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
);

// Microsoft Auth Routes
router.get('/microsoft',
    passport.authenticate('microsoft', {
        prompt: 'select_account',
    })
);

router.get('/microsoft/callback',
    passport.authenticate('microsoft', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
);

// Apple Auth Routes
router.post('/apple',
    passport.authenticate('apple', {
        scope: ['email', 'name']
    })
);

router.post('/apple/callback',
    passport.authenticate('apple', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
);

// Logout Route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
