import mongoose from 'mongoose'

const { Schema, model } = mongoose

const masterProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  manufacturer: String,
  weightOfSinglePackagingUnitNet: Number,
  weightOfSinglePackagingUnitWhole: Number,
  typeOfSinglePackagingUnit: String,
  safetyStock: Number,

  stock: [
    {
      type: Schema.Types.ObjectId,
      ref: 'StockProduct'
    }
  ],
}, {
  timestamps: true,
})

const MasterProduct = model('MasterProduct', masterProductSchema)

export { MasterProduct }