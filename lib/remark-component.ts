import fs from "node:fs";
import path from "node:path";

import { visit } from "unist-util-visit";

import type { UnistNode, UnistTree } from "@/types/unist";

export function remarkComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode, index, parent) => {
      const srcAttr = getNodeAttributeByName(node, "src");
      const srcPath = srcAttr?.value as string | undefined;

      if (node.name === "ComponentSource") {
        if (!srcPath) {
          return null;
        }

        try {

          const src = path.join(process.cwd(), srcPath);
          const filePath = src;
          let source = fs.readFileSync(filePath, "utf8");
          source = source.replaceAll(`@/registry/`, "@/components/");
          source = source.replaceAll("export default", "export");

          const title = getNodeAttributeByName(node, "title");
          const showLineNumbers = getNodeAttributeByName(
            node,
            "showLineNumbers"
          );

          const codeBlock = {
            type: "code",
            meta: [
              title ? `title="${title.value}"` : "",
              showLineNumbers ? "showLineNumbers" : "",
            ].join(" "),
            lang: path.extname(filePath).slice(1),
            value: source,
          };

          if (parent && typeof index === "number") {
            parent.children.splice(index, 1, codeBlock);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}