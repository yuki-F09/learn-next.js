import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({subsets: ["latin"]});

export const lusitana = Lusitana({
  // weightは指定しないとエラーになる
  weight: ["400", "700"],
  subsets: ["latin"]})
