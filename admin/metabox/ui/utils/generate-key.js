// Creates a unique key for an item using a timestamp
export const keyGen = entropy => {
  const timeNow = new Date().getTime();
  const uid = entropy ? `${timeNow}-${entropy}` : timeNow;

  return uid;
};
