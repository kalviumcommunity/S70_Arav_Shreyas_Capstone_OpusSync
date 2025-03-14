const passport = require('passport');
const { Strategy: GoogleStrategy} = require('passport-google-oauth20');

const {config} = require('./app.config');
const NotFoundException = require('../utils/appError')
const {ProviderEnum} = require('../enums/account-provider.enum');
const {loginOrCreateAccountService} = require('../services/auth.service')

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
            scope: ['profile','email'],
            passReqToCallback: true
        },
        async(req,accessToken,refreshToken,profile,done)=>{
            try{
                const {email,sub: googleId,picture} = profile._json;
                console.log(profile,"Profile")
                console.log(googleId,"Google ID")

                if(!googleId){
                    throw new NotFoundException("Google ID (sub) is missing")
                }

                const {user} = await loginOrCreateAccountService({
                    provider: ProviderEnum.GOOGLE,
                    displayName: profile.displayName,
                    providerId: googleId,
                    picture: picture,
                    email: email,
                })
                done(null,user)
            }catch(error){
                done(error,false)
            }
        }
    )
)

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;