const env = {
    REACT_APP_ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN!,
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL!,
    REACT_APP_REFRESH_TOKEN: process.env.REACT_APP_REFRESH_TOKEN!,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY!,
    FIREBASE: {
        API_KEY: process.env.FIREBASE_API_KEY!,
        DOMAIN:  process.env.FIREBASE_DOMAIN!,
        PROJECT_ID:  process.env.FIREBASE_PROJECT_ID!,
        BUCKET:  process.env.FIREBASE_BUCKET!,
        SENDER_ID:  process.env.FIREBASE_SENDER_ID!,
        APP_ID:  process.env.FIREBASE_APP_ID!,
        MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID!,
    }
}

export default  env;