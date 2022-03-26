module.exports = {
    catchAsync: (fn) => {
        return async (req, res, next) => {
            try {
                await fn(req, res, next);
            } catch (error) {
                console.log('catchAsync error', error);
                next(error);
            }
        };
    },
};