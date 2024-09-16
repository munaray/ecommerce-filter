import { Index } from "@upstash/vector";

import * as dotenv from "dotenv";
dotenv.config();

// The rest of your code

export type ProductProps = {
	id: string;
	imageId: string;
	name: string;
	size: "S" | "M" | "L";
	color: "white" | "beige" | "green" | "purple" | "blue";
	price: number;
};

export const db = new Index<ProductProps>();
