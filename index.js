import express from 'express'
import { ApolloServer } from 'apollo-server-express'
const PORT = process.env.PORT || 4000;
import { typeDefs } from './graphql/typeDefs.js'

import dotenv from 'dotenv'

import resolvers from './graphql/resolvers.js'

import mongoose from 'mongoose'
import { MasterProduct } from './models/MasterProduct.js'
import { StockProduct } from './models/StockProduct.js'
import { Movement } from './models/Movement.js'

dotenv.config({ path: '.env' })
  // console.log(data)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})
  .then(() => console.log('Database connected'))
  .catch(e => console.log(e))


const initServer = async () => {

  const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: (req) => {
      return {
        ...req,
        MasterProduct,
        StockProduct,
        Movement,
      }
    }
  });
  const app = express()
  
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  
  
  // console.log(app)
  
  // The `listen` method launches a web server.
  app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`))
}

initServer()