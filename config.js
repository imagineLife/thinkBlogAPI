exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/restaurants-app';
exports.PORT = process.env.PORT || 8080;

/*
mongodb://<dbuser>:<dbpassword>@ds059644.mlab.com:59644/rstrnt
*/