// base: https://www.vote62.com/candidates/ส.ส.เขต/กรุงเทพมหานคร.04/
// ส.ส.เขต/กรุงเทพมหานคร.04

import { httpGet } from "../utils/fetch";
import { logJSON, logText } from "../utils/writeToFile";
import * as cheerio from "cheerio";

function parseCandidates(html: string) {
  const $ = cheerio.load(html);

  const candidates = $("li.col-span-1")
    .map((_, element) => {
      const number = +$(element)
        .find("span.text-xl.font-extrabold.leading-none")
        .text();
      const name = $(element).find("span.block.font-extrabold").text();
      const party = $(element)
        .find("span.space-x-2.leading-none.text-sm.mr-2")
        .text();

      return {
        number,
        name,
        party,
      };
    })
    .get();
  logJSON(candidates, "candidates");
}

export async function fetchCandidatesFromZone() {
  const zone = "กรุงเทพมหานคร.04";

  const { data, status } = await httpGet(`/${zone}`);

  if (status !== 200) {
    throw new Error(`Error fetching data from ${zone}`);
  }

  const candidates = parseCandidates(data);

  console.log(candidates);

  return candidates;
  // const html = response.getContentText();
  // const candidates = parseCandidates(html);
  // return candidates;
}
