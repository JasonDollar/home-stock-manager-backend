import { ADD_MVT } from "../lib/constants.js";
export default {
  addMasterProduct: async (parent, args, { MasterProduct }) => {

    const {
      name, 
      description, 
      manufacturer, 
      weightOfSinglePackagingUnit, 
      typeOfSinglePackagingUnit, 
      safetyStock 
    } = args.data

    const alreadyExists = MasterProduct.find({ name })
    if (alreadyExists) return null

    const newMasterProduct = new MasterProduct({
      name, 
      description, 
      manufacturer, 
      weightOfSinglePackagingUnit, 
      typeOfSinglePackagingUnit, 
      safetyStock 
    })
    await newMasterProduct.save()

    return newMasterProduct
  },
  addStockProduct: async (parent, args, { StockProduct, MasterProduct, Movement }) => {

    const { masterProductId, name, quantity, typeOfQuantMeasurment, customId } = args.data

    let masterProd = await MasterProduct.findOne({ name })

    if (!masterProd) {
      masterProd = new MasterProduct({ name })
    } 

    const newStockProds = []
    if (typeOfQuantMeasurment === 'unit') {
      for (let i = 0; i < quantity; i++) {
        const newStockProduct = new StockProduct({
          masterData: masterProd._id,
          name,
          quantity,
          typeOfQuantMeasurment,
          percentOfStockLeft: 100,
          customId
        })
        const savedItem = await newStockProduct.save()
        newStockProds.push(savedItem)
      }
    } else {
      const newStockProduct = new StockProduct({
        masterData: masterProd._id,
        name,
        quantity,
        typeOfQuantMeasurment,
        percentOfStockLeft: 100,
        customId
      })
      const savedItem = await newStockProduct.save()
      newStockProds.push(savedItem)
    }

    const newMovement = new Movement({
      mvementType: ADD_MVT,
      typeOfQuantMeasurment,
      quantity,
      masterData: masterProd._id
    })
    
    masterProd.stock = newStockProds.map(item => item._id)
    await masterProd.save()
    await newMovement.save()

    return newStockProds
  },
}