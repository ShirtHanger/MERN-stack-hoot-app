import axios from "axios"
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`

// INDEXES list of all hoots from database
async function indexHoots() {
    try {
      const response = await axios(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }) // Since this is PROTECTED ROUTE in backend, you MUST include header authorization

      return response.data

    } catch (error) {
      console.log(error)
    }
}

// SHOWS a specific hoot by obtaining its ID
async function showHoot(hootId) {
    try {
      const response = await axios(`${BASE_URL}/${hootId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }


export { indexHoots, showHoot }