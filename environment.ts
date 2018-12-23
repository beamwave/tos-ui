const dev = {
  context: `http://localhost:8080`,
  db: 'mongodb://localhost:27017/collegeboard'
}
const prod = {
  context: 'https://dwea2klqp52vb.cloudfront.net',
  // CHANGE!
  db: 'hi'
  // db: 'mongodb://phantom-user:p2hantom@ds261838.mlab.com:61838/phantom'
}

// possible solution to invalidating the cache; add a query parameter
// const prod = {
//   context: 'https://dwea2klqp52vb.cloudfront.net?v=2'
// }

export const environment = process.env.NODE_ENV === 'production' ? prod : dev
