const getCount = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(9)
    }, 1000)
  })
}
const getAsyncCount = async () => {
  const value = await getCount()
  console.log(value)
}

getAsyncCount()