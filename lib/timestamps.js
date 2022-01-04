export const addTimestamp = (obj) => ({
  ...obj,
  createdAt: new Date(),
  editedAt: new Date(),
})