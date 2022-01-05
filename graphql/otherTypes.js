const StockProduct = {
  masterData: async (parent, args, { MasterProduct }) => {
    const finding = await MasterProduct.findOne({ _id: parent.masterData })
    return finding
  }
}
const MasterProduct = {
  stock: async (parent, args, { StockProduct }) => {
    const findings = await StockProduct.find({ _id: { $in: parent.stock } })
    return findings
  },
  movements: async (parent, args, { Movement }) => {
    const findings = await Movement.find({ masterData: parent._id })
    return findings
  }
}
const Movement = {
  masterData: async (parent, args, { MasterProduct }) => {
    const finding = await MasterProduct.findOne({ _id: parent.masterData })
    return finding
  }
}

export default {
  StockProduct,
  MasterProduct,
  Movement
}