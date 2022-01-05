export const addTimestamp = (obj) => ({
  ...obj,
  createdAt: new Date(),
  updatedAt: new Date(),
})