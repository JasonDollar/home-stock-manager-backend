import mongoose from 'mongoose'
import { movementTypeEnum } from '../lib/constants.js'

const { Schema, model } = mongoose

const movementSchema = new Schema({
  mvementType: {
    type: String,
    enum: movementTypeEnum
  },
  typeOfQuantMeasurment: {
    type: String,
    default: 'unit'
  },
  quantity: Number,
  masterData: {
    type: Schema.Types.ObjectId,
    ref: 'MasterProduct'
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Movement = model('Movement', movementSchema)

export { Movement }