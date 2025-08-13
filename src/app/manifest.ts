import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Room.io",
    short_name: "Room.io",
    description: "Mobile online games",
    start_url: "/",
    display: "standalone",
    background_color: "#2f0d68",
    theme_color: "#4d179a",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
