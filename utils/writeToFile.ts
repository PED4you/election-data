import fs from "fs";
import converter from "json-2-csv";

export function logText(text: string, id?: string) {
  fs.writeFile(
    `data/${id && `${id}-`}${new Date().getTime()}.txt`,
    text,
    (err) => {
      if (err) console.error(err);
      else console.log(`✨ file written! - ${id}`);
    }
  );
}

export function logJSON(object: object, id?: string) {
  fs.writeFile(
    `data/${id && `${id}-`}${new Date().getTime()}.json`,
    JSON.stringify(object, null, 2),
    (err) => {
      if (err) console.error(err);
      else console.log(`✨ file written! - ${id}`);
    }
  );
}

export async function logCSV(object: object[], id?: string) {
  try {
    const csv = await converter.json2csv(object);

    // print CSV string
    fs.writeFile(
      `data/${id && `${id}-`}${new Date().getTime()}.csv`,
      csv as string,
      (err) => {
        if (err) console.error(err);
        else console.log(`✨ file written! - ${id}`);
      }
    );
  } catch (err) {
    console.error(err);
  }
}
