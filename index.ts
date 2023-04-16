import { fetchCandidatesFromZone } from "./scripts/parseRegion";
import {
  getAllImages,
  saveAllImagesToLocal,
  saveImagesToDB,
} from "./scripts/saveImages";

try {
  // fetchCandidatesFromZone();
  // saveImagesToDB();
  // getAllImages();
  saveAllImagesToLocal();

  console.log("🌟 Done");
} catch (error) {
  console.error(error);
}
