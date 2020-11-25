import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  _id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  birth_date?: string
  password: string
  recovery_token?: string
}

export interface IUserDocument extends Document {
  _id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  birth_date?: string
  password: string
  recovery_token?: string
}

const UserSchema: Schema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone_number: {
      type: String,
      required: true
    },
    birth_date: {
      type: String
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    recovery_token: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre<IUserDocument>('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

export default model<IUserDocument>('User', UserSchema)
