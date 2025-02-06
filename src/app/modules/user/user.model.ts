import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { UserRole } from "./user.constant";
import bcrypt from 'bcrypt';
import config from "../../config";


const userSchema = new Schema<IUser, UserModel>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: 0 },
        role: { type: String, enum: UserRole, default: 'user' },
   
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
        toObject: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    },
);

// before
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(this.password, config.bcrypt_salt_round);
    next();
});

userSchema.static('isUserExistsByEmail', async function (email: string) {
    return await User.findOne({ email }).select('+password');
});

userSchema.static(
    'isUserPasswordMatched',
    async function (planePassword, hashPassword) {
        return await bcrypt.compare(planePassword, hashPassword);
    },
);
userSchema.static('isUserBlocked', async function (status: string) {
    return status === 'blocked';
});
userSchema.static(
    'isJWTissuedBeforePasswordChange',
    async function (passwordChangeTime: Date, JwtIssuedTime: number) {
        const passwordChangeAtTime =
            new Date(passwordChangeTime).getTime() / 1000;

        return passwordChangeAtTime > JwtIssuedTime;
    },
);
export const User = model<IUser, UserModel>('User', userSchema);