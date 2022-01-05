import mongoose from 'mongoose'
import { typeOfQuantMeasurmentEnum } from '../lib/constants.js'

const { Schema, model } = mongoose

const stockProductSchema = new Schema({
  quantity: Number,
  typeOfQuantMeasurment: {
    type: String,
    default: 'unit',
    enum: typeOfQuantMeasurmentEnum
  },
  percentOfStockLeft: {
    type: Number,
    default: 100
  },
  expiryDate: String,
  customId: String,
  masterData: {
    type: Schema.Types.ObjectId,
    ref: 'MasterProduct'
  }
}, {
  timestamps: true,
})

const StockProduct = model('StockProduct', stockProductSchema)

export { StockProduct }