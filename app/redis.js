import redis from 'redis';

let client = redis.createClient(process.env.REDIS_URL);

export default client;

