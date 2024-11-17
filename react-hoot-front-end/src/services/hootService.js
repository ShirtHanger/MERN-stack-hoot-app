import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;

async function indexHoots() {
    try {
      const response = await axios(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }); // Since this is PROTECTED ROUTE in backend, you MUST include header authorization
      /*  */
      return response.data;
    } catch (error) {
      console.log(error);
    }
};

/* async function indexHoots() {
    try {
        const response = await axios.get(BASE_URL)
        return response.data // Sends data back in JSON format, axios does this automatically, so .json() is not required
        // How do I insert this headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    } catch (error) {
        console.log(error)
    }
}
   */
export { indexHoots };