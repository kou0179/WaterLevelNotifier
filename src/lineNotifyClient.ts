import { LineNotifySendRequest } from "./types.js";
import ky from "ky-universal";
import FormData from "form-data";

export const sendMessage = async (request: LineNotifySendRequest) => {
  const formData = new FormData();
  formData.append("message", request.message);
  formData.append(
    "notificationDisabled",
    (request.notificationDisabled === undefined
      ? false
      : request.notificationDisabled
    ).toString()
  );
  try {
    const ret = await ky.post("https://notify-api.line.me/api/notify", {
      body: formData,
      headers:{
        'Authorization': `Bearer ${request.token}`
      }
    });
  } catch (err) {
    console.log(err);
  }
};
