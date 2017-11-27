/**
 * Service work with users
 * @type {exports.user}
 */
exports.service = class {

    constructor(doc = null) {
        this.doc = doc;

        return this;
    }

    /**
     * Create entity for save to database
     * @param data
     * @returns {{}|*}
     */
    static createEntity(data) {
        let docEntity = {};

        for(let field in data) {
            if (field === 'file') {
                const file = data[field];

                docEntity.type = file.originalname.split('.').pop();
                docEntity.file_name = file.originalname;
                docEntity.hash = file.filename;
                docEntity.size = file.size;
            } else {
                docEntity[field] = data[field];
            }

        }

        return docEntity;
    }
};