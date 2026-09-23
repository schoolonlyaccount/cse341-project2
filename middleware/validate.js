const validator = require('../helpers/validate');

const saveItem = (rule) => (req, res, next) => {
    const validationRule = rule;
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveItem
};