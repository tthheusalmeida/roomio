import { Product } from "@/services/product";
import { toTitleCase } from "./text";

export function productTitle(product: Product) {
  return toTitleCase(product.title);
}
