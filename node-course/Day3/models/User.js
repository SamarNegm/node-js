const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: { validator: isEmail, message: 'Enter Valid Email' },
        },
        password: {
            type: String,
            required: true,
            min: 6,
            //to never show the password, even its encrypted 'select:false'
        },
        avatar: String,
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    console.log('before', this.password);
    this.password = await bcrypt.hash(this.password, 12);
    console.log('after', this.password);
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model('User', userSchema);
module.exports = User;