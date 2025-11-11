import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const domain = searchParams.get("domain");
  const isForSale = searchParams.get("sale") === "true";

  const magistralMedium = await readFile(
    join(process.cwd(), "assets/fonts/Magistral-Medium.ttf")
  );

  const robotoMedium = await readFile(
    join(process.cwd(), "assets/fonts/Roboto-Medium.ttf")
  );

  return new ImageResponse(
    (
      <div tw="flex text-black bg-white w-full h-full p-16">
        <div tw="flex-1 flex flex-col justify-center border-l border-r border-zinc-200">
          <div tw="flex justify-center border-t border-b border-zinc-200">
            <h1
              tw="mt-8 mb-4 ml-8 mr-8 font-medium"
              style={{ fontFamily: "Magistral", fontSize: 88 }}
            >
              {domain}
            </h1>
          </div>

          <div tw="flex justify-center border-b border-zinc-200">
            <p
              tw="mt-0 mb-0 pt-4 pb-4 pl-8 pr-8 font-medium"
              style={{
                fontFamily: "Roboto",
                fontSize: 32,
                color: isForSale ? "#22c55e" : "#71717a",
              }}
            >
              {isForSale
                ? "The domain name is for sale"
                : "The website will be launched soon"}
            </p>
          </div>
        </div>

        <div tw="absolute flex inset-y-0 w-px bg-zinc-200 left-16" />
        <div tw="absolute flex inset-y-0 w-px bg-zinc-200 right-16" />
        <div tw="absolute flex inset-x-0 h-px bg-zinc-200 top-16" />
        <div tw="absolute flex inset-x-0 h-px bg-zinc-200 bottom-16" />


        <div tw="absolute flex bottom-16 right-16">
          <svg
            width={160}
            height={80}
            viewBox="0 0 256 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M9.4256 76.8V51.2H28.27685V76.8H9.4256Z M9.4256 102.4V76.8H28.27685V102.4H9.4256Z M9.4256 128V102.4H28.27685V128H9.4256Z M28.27685 51.2V25.6H47.1281V51.2H28.27685Z M28.27685 102.4V76.8H47.1281V102.4H28.27685Z M47.1281 25.6V0H65.9795V25.6H47.1281Z M47.1281 102.4V76.8H65.9795V102.4H47.1281Z M65.9795 51.2V25.6H84.8305V51.2H65.9795Z M65.9795 102.4V76.8H84.8305V102.4H65.9795Z M84.8305 76.8V51.2H103.682V76.8H84.8305Z M84.8305 102.4V76.8H103.682V102.4H84.8305Z M84.8305 128V102.4H103.682V128H84.8305Z M152.318 25.6V0H171.1695V25.6H152.318Z M152.318 51.2V25.6H171.1695V51.2H152.318Z M152.318 76.8V51.2H171.1695V76.8H152.318Z M152.318 102.4V76.8H171.1695V102.4H152.318Z M152.318 128V102.4H171.1695V128H152.318Z M171.1695 25.6V0H190.0205V25.6H171.1695Z M171.1695 76.8V51.2H190.0205V76.8H171.1695Z M190.0205 25.6V0H208.872V25.6H190.0205Z M190.0205 76.8V51.2H208.872V76.8H190.0205Z M208.872 25.6V0H227.723V25.6H208.872Z M208.872 76.8V51.2H227.723V76.8H208.872Z M227.723 51.2V25.6H246.5745V51.2H227.723Z"
            />
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Magistral", data: magistralMedium, weight: 500 },
        { name: "Roboto", data: robotoMedium, weight: 500 },
      ],
    }
  );
}
