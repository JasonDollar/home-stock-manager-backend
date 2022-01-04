import { v4 as id } from 'uuid'
import data from '../data.js'
import { addTimestamp } from '../lib/timestamps.js';

const resolvers = {
  Query: {
    masterProductsList: () => data.masterProducts,
    stockProductsList: () => data.stockProducts,
    singleMasterProduct: (parent, { id }) => {
      const masterProd = data.masterProducts.find(item => item._id === id)
      if (!masterProd) return null

      return masterProd
    },
    singleStockProduct: (parent, { id }) => {
      const stockProd = data.stockProducts.find(item => item._id === id)
      if (!stockProd) return null

      return stockProd
    },
  },
  Mutation: {
    addMasterProduct: (parent, args, ctx) => {
      // console.log(parent)
      const {name, 
        description, 
        manufacturer, 
        weightOfSinglePackagingUnit, 
        typeOfSinglePackagingUnit, 
        safetyStock 
      } = args.data

      const newMasterProduct = addTimestamp({
        _id: id(),
        name, 
        description, 
        manufacturer, 
        weightOfSinglePackagingUnit, 
        typeOfSinglePackagingUnit, 
        safetyStock,
      })

      data.masterProducts.push(newMasterProduct)

      return newMasterProduct
    },
    addStockProduct: (parent, args, ctx) => {
      // console.log(args)
      const { masterProductId, name, quantity, typeOfQuantMeasurment, customId } = args.data
      let newMasterProductId
      if (!masterProductId) {
        const masterProdExists = data.masterProducts.find(item => item.name?.toLocaleLowerCase() === name?.toLocaleLowerCase())
        newMasterProductId = masterProdExists._id

        if (!masterProdExists) {
          newMasterProductId = id()
  
          data.masterProducts.push(addTimestamp({_id: newMasterProductId, name}))
        }
      }

      const newStockProduct = addTimestamp({
        _id: id(),
        masterData: newMasterProductId,
        name,
        quantity,
        typeOfQuantMeasurment,
        percentOfStockLeft: 100,
        customId
      })

      data.stockProducts.push(newStockProduct)

      return newStockProduct
    },
  },
  StockProduct: {
    masterData: (parent) => {
      const finding = data.masterProducts.find(item => parent.masterData === item._id)
      // console.log(parent, finding)
      return finding
    }
  },
  MasterProduct: {
    stock: (parent) => {
      const findings = data.stockProducts.filter(item => item.masterData === parent._id)

      return findings
    }
  },
};


export default resolvers