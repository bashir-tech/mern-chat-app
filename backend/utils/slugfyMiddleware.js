const slugify = require('slugify');

const slugifyMiddleware = (field) => (req, res, next) => {
    if (req.body[field]) {
        req.body.slug = slugify(req.body[field], {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g
        });
    }
    next();
};

module.exports = slugifyMiddleware;
