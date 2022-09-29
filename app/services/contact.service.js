 const { objectId, ObjectId } = require("mongodb");
const { create, deleteAll } = require("../controllers/contact.controller");

 class ContactService {
    constructor(client) {
        this.Conntact = client.db().collection("contacts");

    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

// Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
extractConactData(payload) {
    const contact = {
        name:payload.name,
        email: payload.email,
        address: payload.address,
        phone: payload.phone,
        favorite: payload.favorite,

    };
    // Remove undefined fields
    Objects.keys(contact).forEach(
        (hey) => contact[key] === undefined && delete contact[key]

    );
    return contact;
  }
async create(payload) {
    const contact = this.extractConactData(payload);
    const result = await this.Contact.findOneAndUpdate(
        contact,
        { $set: { favorite: contact.favorite === true } },
        {returnDocument: "after", upsert: true }

    );
    return result.value;
  }
 async find(filter) {
    const cursor = await this.Contact.find(filter);
    return await cursor.toArray();

 }
 async findByName(name) {
    return await this.find({
        name: { $regex: new RegExp(name), $options: "i" },
    });
 }
 
     async delete(id) {
    const result = await this.Contact.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
 }
 
 async findFavorite (){
    return await this.find({ favorite: true});
 }
 


   async deleteAll() {
    const result = await this.Contact.deleteMany({});
    return result.deleteCount;
    }
 }



 module.exports = ContactService;