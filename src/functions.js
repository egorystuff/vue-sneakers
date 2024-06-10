import axios from 'axios'

export const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const obj = { item_id: item.id }
      const { data } = await axios.post(`https://bd1bfdbaf3f110ab.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://bd1bfdbaf3f110ab.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.error(error)
  }
}
