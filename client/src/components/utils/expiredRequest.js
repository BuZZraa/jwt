import axios from "axios";

export default async function expiredRequest(initialRequest) {
  try {
    // Initial request to the backend.
    await initialRequest();
  } catch (error) {
    //If the access token is expired then this triggered.
    if (error.response?.data?.message === "Expired") {
      //Fectching access token by sending post request to backend with refresh token.
      await axios.post(
        "http://localhost:3000/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      //Initial request sent again to backend because previous request was denied deu to token expiration.
      await initialRequest();
    } else {
      console.error("Failed to fetch notes:", error);
    }
  }
}