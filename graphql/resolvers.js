import { ADD_MVT } from "../lib/constants.js";
import Query from './Query.js'
import Mutation from './Mutation.js'
import otherTypes from './otherTypes.js'

const resolvers = {
  Query,
  Mutation,
  ...otherTypes
};


export default resolvers