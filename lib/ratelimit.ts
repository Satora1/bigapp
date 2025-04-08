import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(3, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit",
})

export default rateLimit;