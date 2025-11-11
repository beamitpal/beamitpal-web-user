import fs from "node:fs";
import path from "node:path";

import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import type { UnistNode, UnistTree } from "@/types/unist";

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // Find the 'src' attribute
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
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {},
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: [`language-${path.extname(filePath).slice(1)}`],
                  },
                  data: {
                    meta: [
                      title ? `title="${title.value}"` : "",
                      showLineNumbers ? "showLineNumbers" : "",
                    ].join(" "),
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          );
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