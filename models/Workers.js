const mongoose = require("mongoose")
const validator = require("validator")

const studentSchema = new mongoose.Schema(
    {
        
        //country: String,
        // The_ID:
        // {
        //     type: String,
        //     required: [true, "ID required"],
        // },
        The_country: 
        {
            type: String,
            required: [true, "countery required"],
        },
        The_fname: 
        {
            type: String,
            required: [true, "first name required"],
            validate: {
                validator: function(value){
                    return validator.isAlpha(value)
                },
                message: "first name is not valid",
            },
        },
        The_lname: 
        {
            type: String,
            required: [true, "last name required"],
            validate: {
                validator: function(value){
                    return validator.isAlpha(value)
                },
                message: "last name is not valid",
            },
        },
        The_email: 
        {
            type: String,
            required: [true, "email required"],
            validate: {
                validator: function(value){
                    return validator.isEmail(value)
                },
                message: "Email is not valid",
            }
        },
        The_password: 
        {
            type: String,
            required: [true, "password required"],
            minlength: [8, "password must more than 8 characters"]
        },

        The_confirm_password: 
        {
            type: String,
            required: [true, "password required"],
            minlength: [8, "password must more than 8 characters"],
          
        },
        The_city: 
        {
            type: String,
            required: [true, "password required"],
            validate: {
                validator: function(value){
                    return validator.isAlpha(value)
                },
                message: "city is not valid",
            },
        },
        The_mpn:
        {
            type: String,
            required: [true, "phone number required"],
        },
        The_state: 
        {
            type: String,
            required: [true, "state required"],
            validate: {
                validator: function(value){
                    return validator.isAlpha(value)
                },
                message: "state is not valid",
            },
        },
        The_address: 
        {
            type: String,
            required: [true, "address required"],
            validate: {
                validator: function(value){
                    return validator.isAlpha(value)
                },
                message: "address is not valid",
            },
        },
        The_ZIP: 
        {
            type: String,
            required: [true, "ZIP number required"],
        },
        
    }
)
module.exports = mongoose.model("Student", studentSchema)