
const resolvers = {
  Query: {
    masterProductsList: async (parent, args, ctx) => {
      const { MasterProduct } = ctx
      return await MasterProduct.find()
    },
    stockProductsList:  async (parent, args, ctx) => {
      const { StockProduct } = ctx
      return await StockProduct.find()
    },
    singleMasterProduct: async (parent, { id }, { MasterProduct }) => {
      const masterProd = await MasterProduct.findOne({ _id: id })
      // console.log(masterProd)
      if (!masterProd) return null

      return masterProd
    },
    singleStockProduct: async (parent, { id }, { StockProduct }) => {
      const stockProd = await StockProduct.findOne({ _id: id })
      // ex. below: second object -> quantity field won't be selected
      // const stockProd = await StockProduct.findOne({ _id: id }, { quantity: 0 })
      if (!stockProd) return null

      return stockProd
    },
  },
  Mutation: {
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
    addStockProduct: async (parent, args, { StockProduct, MasterProduct }) => {

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
      
      masterProd.stock = newStockProds.map(item => item._id)
      await masterProd.save()

      return newStockProds
    },
  },
  StockProduct: {
    masterData: async (parent, args, { MasterProduct }) => {
      const finding = await MasterProduct.findOne({ _id: parent.masterData })
      return finding
    }
  },
  MasterProduct: {
    stock: async (parent, args, { StockProduct }) => {
      const findings = await StockProduct.find({ _id: { $in: parent.stock } })
      return findings
    }
  },
  Movement: {
    masterData: async (parent, args, { MasterProduct }) => {
      const finding = await MasterProduct.findOne({ _id: parent.masterData })
      return finding
    }
  },
};


export default resolvers