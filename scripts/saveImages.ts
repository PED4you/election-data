import fs from "fs";
import getDb from "../utils/firebase-admin";
import * as dotenv from "dotenv";
import data from "../data/images.json";
import { httpGet } from "../utils/fetch";
import { writeImageToDisk } from "../utils/writeToFile";
import axios from "axios";

// https://ped4u.s3.ap-southeast-1.amazonaws.com/bad-2023-04-14T08%3A50%3A01.319Z.png

export async function saveImagesToDB() {
  dotenv.config();

  const db = getDb();

  const images = data.content?.map((image) => {
    return {
      name: image.Key?.slice(0, -4),
      url: `https://ped4u.s3.ap-southeast-1.amazonaws.com/${image.Key}`,
      isGood: image.Key?.startsWith("good"),
    };
  });

  const batch = db.batch();

  images?.forEach((image) => {
    const ref = db.collection("images").doc(image?.name ?? "");
    batch.set(ref, image);
  });

  await batch.commit();
}

export async function getAllImages() {
  const db = getDb();
  const images = await db.collection("images").get();

  // get all good and bad images count

  const goodImages = images.docs.filter((image) => image.data().isGood);
  const badImages = images.docs.filter((image) => !image.data().isGood);

  console.log("🌟 Good images count", goodImages.length);
  console.log("🌟 Bad images count", badImages.length);
  console.log("🌟 Total images count", images.docs.length);

  return {
    goodImages,
    badImages,
    images,
  };
}

export async function saveAllImagesToLocal() {
  const db = getDb();
  const images = await db.collection("images").get();

  const imagePromises = images.docs.map(async (image) => {
    const data = image.data();

    const response = await axios({
      url: data?.url,
      responseType: "stream",
    });

    await response.data.pipe(fs.createWriteStream(`images/${data?.name}.png`));

    return data;
  });

  await Promise.all(imagePromises);
}
