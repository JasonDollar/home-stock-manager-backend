import mongoose from 'mongoose'

const { Schema, model } = mongoose

const movementSchema = new Schema({
  mvementType: {
    type: String,
    enum: ['ADD']
  },
  typeOfQuantMeasurment: {
    type: String,
    default: 'unit'
  },
  quantity: Number,
  masterData: {
    type: Schema.Types.ObjectId,
    ref: 'MasterProduct'
  }
}, {
  timestamps: true,
})

const Movement = model('Movement', movementSchema)

export { Movement }