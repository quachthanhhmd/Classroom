import axios from "axios";
import { read, utils } from "xlsx";

const STYLE = {
  generalHeader: {
    alignment: {
      horizontal: "center",
    },
  },
};

export const getSpecification = (displayName: string, width) => {
  return {
    width,
    displayName,
    headerStyle: STYLE.generalHeader,
  };
};

export const getDataFromExcelUrl = async (url: string) => {
  try {
    const data = await axios
      .get(url, { responseType: "arraybuffer" })
      .then((res) => res.data);
    const workbook = read(data);

    const split = url.split("?")[0].split("/").pop()?.split("/").pop();
    const fileName = decodeURIComponent(JSON.parse(JSON.stringify(split)))
      .split("/")
      .pop();

    return {
      fileName,
      data: workbook.SheetNames.map((sheetName) => {
        return {
          sheetName,
          data: utils.sheet_to_json(workbook.Sheets[sheetName]),
        };
      }),
    };
  } catch (err) {
    return Promise.reject(err);
  }
}