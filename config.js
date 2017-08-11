exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      // 'mongodb://localhost/blogDB';
                      'mongodb://blogger:Blogging247@ds155490.mlab.com:55490/blogdb';
exports.PORT = process.env.PORT || 8080;