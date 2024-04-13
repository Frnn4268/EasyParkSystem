const mongoose = require('mongoose')
const uniqueValidation = require('mongoose-unique-validation')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Empleado', 'Administrador']
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
  
      delete returnedObject.passwordHash // Deleting the pass
    }
  })

userSchema.plugin(uniqueValidation) 

// User Model
const User = mongoose.model('User', userSchema)
module.exports = User