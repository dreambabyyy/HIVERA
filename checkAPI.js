import fetch from "node-fetch";
import logger from "./utils/logger_2.js";
import { settings } from "./config.js";

const urlChecking = "https://raw.githubusercontent.com/Hunga9k50doker/APIs-checking/refs/heads/main/endpoints.json";

async function checkBaseUrl() {
  logger.info("Checking api...");
  if (settings.ADVANCED_ANTI_DETECTION) {
    const result = await getBaseApi(urlChecking);
    if (result.endpoint) {
      logger.info("No change in api!", "success");
      return result;
    }
  } else {
    return {
      endpoint: settings.BASE_URL,
      message:
        "If the api changes please contact the By BianzZz tele team for more information and updates!| Have any issuess, ",
    };
  }
}

async function getBaseApi(url) {
  try {
    const response = await fetch(url);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const content = await response.json();

    if (content?.hivera) {
      return { endpoint: content.hivera, message: content.copyright };
    } else {
      return {
        endpoint: null,
        message:
          "If the api changes please contact the By BianzZz tele team for more information and updates!| Have any issues,",
      };
    }
  } catch (e) {
    return {
      endpoint: null,
      message:
        "If the api changes please contact the By BianzZz tele team or more information and updates!| Have any issues, ",
    };
  }
}

export { checkBaseUrl };
