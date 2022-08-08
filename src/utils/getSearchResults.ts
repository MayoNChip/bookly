import axios from "axios";
import Toast from "./genToast";

const APIProvider = {
  getSearchResults: async (searchBy: string, searchValue: string) => {
    try {
      const URL = `http://localhost:3000/api/books?${searchBy}=${searchValue}`;
      console.log("URL", URL);
      const res = await axios.get(
        `http://localhost:3000/api/books?${searchBy}=${searchValue}`
      );
      console.log("res from axios", res);
      if (res.data.success === false) {
        console.error("Error in getSearchResults", res.data.message);
        return res.data;
      }
      if (res.data[0].message) {
        return res.data[0];
      }
      // if (typeof res.data === "array") {
      //   return res?.data[0]?.data;
      // }
      return res?.data[0].data;
    } catch (error) {
      console.log("error from search API", error);
    }
  },
};
export default APIProvider;
