export MONGO_URL=$(lockbox archivist/mongoUrl)
export SESSION_SECRET=$(lockbox archivist/sessionSecret)
export TWITTER_CONSUMER_KEY=$(lockbox watchers/twitter/api/public)
export TWITTER_CONSUMER_SECRET=$(lockbox watchers/twitter/api/private)
export TWITTER_ACCESS_TOKEN_KEY=$(lockbox watchers/twitter/user/accessToken)
export TWITTER_ACCESS_TOKEN_SECRET=$(lockbox watchers/twitter/user/accessTokenSecret)
export TWITTER_OAUTH_CALLBACK="http://1c0b498d51be.ngrok.io/api/service/twitter/callback"
export STRIPE_PRIVATE_KEY=$(lockbox archivist/dev/stripePrivateKey)
export MAGIC_SECRET_KEY=$(lockbox archivist/dev/magicSecretKey)
