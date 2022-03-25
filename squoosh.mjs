import { ImagePool } from "@squoosh/lib";
import { cpus } from "os";
import { readdirSync, readFileSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";

const imagePool = new ImagePool(cpus().length);

//対象ディレクトリ
const imageDir = "./images";

const imageFileList = readdirSync(imageDir).filter((file) => {
  const regex = /\.(jpe?g|png)$/i;
  return regex.test(file);
});

const imagePoolList = imageFileList.map((file) => {
  const imageFile = readFileSync(`${imageDir}/${file}`);
  const fileName = path.parse(`${imageDir}/${file}`).name;
  const image = imagePool.ingestImage(imageFile);

  return { name: fileName, image };
});

await Promise.all(
  imagePoolList.map(async (item) => {
    const { image } = item;
    await image.encode({
      webp: {
        quality: 80,
      },
    });
  })
);

for (const item of imagePoolList) {
  const {
    name,
    image: { encodedWith },
  } = item;
  const data = await encodedWith.webp;

  await writeFile(`${imageDir}/${name}.webp`, data.binary);
}

await imagePool.close();
