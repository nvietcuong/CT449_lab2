const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const ApiError = require ("../api-error");
const MongoDB = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");

exports.create = (req, res) => {
    res.send({ message: "create handler"});

};

exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const ContactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await ContactService.findByName(name);
        
        }else {
            document = await ContactService.find({});
        }

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(document);

}

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler" });

};
exports.update = (req, res) => {
    res.send({ message: "update handler" });
};
exports.delete = async (req, res, next) => {
try {
    const ContactService = new ContactService(MongoDB.client);
    const document = await ContactService.delete(req.params.id);
    if (! document) {
        return next(new ApiError(404, "Contact not found"));

    } 
    return res.send({ message: "Contact was deleted successfully"});

} catch (error) {
    return next(
        new ApiError (
            500,
            `Could not delete contact with id=${req.params.id}`
        )
    );
}
}



exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" });
};
exports.findAllFavorite = async (_req, red, next) => {
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findFavorite();
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite contact"
            )
        );
    }
};


exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(req.body);
        return res.send(document);

    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.delete = async (_req, res, next) => {
     try {
        const ContactService =  new ContactService(MongoDB.client);
        const deleteCount = await ContactService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully` ,

        });

     } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
     }
    }