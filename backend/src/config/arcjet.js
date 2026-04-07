import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node"
import { ENV } from "./env.js"

// initialize Arcject with securities 

export const aj  = arcjet({
    key: ENV.ARCJET_KEY,
    characteristics: ["ip.src"],

    rules: [
        // shield protects your app from common attacks eg SQL injection, XSS, CSRF attacks
        shield({mode: "LIVE"}),

        // bot - detection - block  all bots except search engines
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE"
                // allow legitimate search engine bots
            ]
        }),

        // rate limiting 
        tokenBucket({
            mode: "LIVE",
            refillRate: 10, 
            interval: 10,
            capacity: 15,
            
        })
    ]

})
