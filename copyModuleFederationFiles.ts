import fs from "fs";
import {
  federationName,
  federationExposedComponents,
} from "./moduleFederation";

const outputDir = "./dist/typings/";
const declarationFile = outputDir + "types.d.ts";

fs.mkdirSync(outputDir, { recursive: true });

try {
  fs.rmSync(`${declarationFile}`);
} catch (e) {
  //ignore
}

Object.entries(federationExposedComponents).forEach(([componentKey, path]) => {
  const pathWithNoSrc = path.replace("./src/", "");
  const pathWithNoSrcAndExtension = pathWithNoSrc + ".d.ts";
  const componentKeyWithNoFolder = componentKey.substring(
    componentKey.lastIndexOf("/") + 1,
    componentKey.length
  );

  const fileContent = fs.readFileSync(
    `./declaration/${pathWithNoSrcAndExtension}`,
    "utf-8"
  );
  const fileContentWithoutDeclare = fileContent.replace("declare ", "");
  const content = `
    declare module "${federationName}/${componentKeyWithNoFolder}" {
      ${fileContentWithoutDeclare}
    }
    `;
  fs.appendFileSync(declarationFile, content);
});

console.log(`Successfully Written to ${declarationFile}.`);
console.log(
  `Please include typing into project by adding ${declarationFile} into tsconfig.json's include`
);
