import Joi from "joi";

function validateRequest(schema, options = {}) {
    return (req, res, next) => {
        const objectSchema = Joi.object(schema);
        const dataToValidate = {
            ...req.params,
            ...req.query,
            ...req.body
        };
        const { value, error } = objectSchema.validate(dataToValidate);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        req.parsedData = value;
        next();
    };
}

export default validateRequest;