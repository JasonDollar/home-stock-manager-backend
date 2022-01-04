import { v4 as id } from 'uuid'

const ids = []

for (let i = 0; i < 10; i++) {
  ids.push(id())
}

// console.log(ids)

export default {
  masterProducts: [
    
    {
      _id: ids[0], 
      name: "Mięsiwo szlecheckie", 
      description: "kiełbasa w słoiku",
      weightOfSinglePackagingUnitNet: 300, 
      weightOfSinglePackagingUnitWhole: 550, 
      typeOfSinglePackagingUnit: 'jar', 
      manufacturer: 'Auchan',
      safetyStock: 0,
      createdAt: new Date(),
      editedAt: new Date(),
    },
    {
      _id: ids[1], 
      name: "Płatki owsiane błyskawiczne", 
      description: "Zwykłe płatki",
      weightOfSinglePackagingUnitNet: 400, 
      weightOfSinglePackagingUnitWhole: 402, 
      typeOfSinglePackagingUnit: 'package', 
      manufacturer: 'Auchan',
      safetyStock: 0,
      createdAt: new Date(),
      editedAt: new Date(),
    },
    
  ],
  stockProducts: [
    {
      _id: id(),
      masterData: ids[0],
      quantity: 1,
      typeOfQuantMeasurment: 'unit',
      percentOfStockLeft: 100,
      customId: 'dmds',
      createdAt: new Date(),
      editedAt: new Date(),
    },
  ]
}