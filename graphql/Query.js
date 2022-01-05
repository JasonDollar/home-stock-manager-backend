export default {
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
}