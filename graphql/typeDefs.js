import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    masterProductsList: [MasterProduct]!
    singleMasterProduct(id: ID!): MasterProduct
    stockProductsList: [StockProduct]!
    singleStockProduct(id: ID!): StockProduct
  }

  type Mutation {
    addMasterProduct(data: MasterProductCreateInput!): MasterProduct
    addStockProduct(data: StockProductCreateInput!): [StockProduct]
  }

  type MasterProduct {
    _id: ID!
    name: String!
    description: String
    manufacturer: String
    weightOfSinglePackagingUnitNet: Int
    weightOfSinglePackagingUnitWhole: Int
    typeOfSinglePackagingUnit: String
    safetyStock: Int
    createdAt: String!
    updatedAt: String!
    stock: [StockProduct]!
  }

  type StockProduct {
    _id: ID!
    masterData: MasterProduct
    quantity: Int
    typeOfQuantMeasurment: String!
    percentOfStockLeft: Int!
    expiryDate: String
    createdAt: String!
    updatedAt: String!
    customId: ID
  }

  enum MovementTypeEnum {
    ADD
  }

  type Movement {
    _id: ID!
    mvementType: MovementTypeEnum!
    typeOfQuantMeasurment: String
    quantity: Int
    masterData: MasterProduct
    createdAt: String!
    updatedAt: String!
  }

  input MasterProductCreateInput {
    name: String!
    description: String
    manufacturer: String
    weightOfSinglePackagingUnit: Int
    typeOfSinglePackagingUnit: String
    safetyStock: Int
  }

  input StockProductCreateInput {
    name: String!
    quantity: Int 
    typeOfQuantMeasurment: String!
    masterProductId: ID  @deprecated ## not decided if will be used
    customId: ID
  }


`

