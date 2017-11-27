/**
 * helper
 * @type {exports.user}
 */
exports.service = class {

    /**
     * get json error
     * @param err
     */
    static errorToJson(err) {
        return err.errors.map((currentValue, index) => {
            if (currentValue.path === 'hash' || currentValue.path === 'salt') {
                return {
                    message: 'user.password cannot be null',
                    path: 'password',
                    value: null
                };
            } else {
                return {
                    message: currentValue.message,
                    path: currentValue.path,
                    value: currentValue.value
                };
            }
        });
    }
};