"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { dataTagSymbol, useQuery } from "@tanstack/react-query";
import { QueryResult } from "@upstash/vector";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { ProductProps } from "@/db";
import Product from "@/components/Products/Product";
import ProductSkeleton from "@/components/Products/ProductSkeleton";
import EmptyState from "@/components/Products/EmptyState";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { ProductState } from "@/lib/validators/product-validator";

const SORT_OPTIONS = [
	{ name: "none", value: "none" },
	{ name: "Price: Low to High", value: "price-asc" },
	{ name: "Price: High to Low", value: "price-desc" },
] as const;

const SUBCATEGORIES = [
	{ name: "T-Shirts", selected: true, href: "#" },
	{ name: "Hoodies", selected: false, href: "#" },
	{ name: "Sweatshirts", selected: false, href: "#" },
	{ name: "Accessories", selected: false, href: "#" },
];

const COLOR_FILTERS = {
	id: "color",
	name: "Color",
	options: [
		{ value: "white", label: "White" },
		{ value: "beige", label: "Beige" },
		{ value: "blue", label: "Blue" },
		{ value: "green", label: "Green" },
		{ value: "purple", label: "Purple" },
	],
} as const;

const SIZE_FILTERS = {
	id: "size",
	name: "Size",
	options: [
		{ value: "S", label: "S" },
		{ value: "M", label: "M" },
		{ value: "L", label: "L" },
	],
} as const;

const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];

export default function Home() {
	const [filter, setFilter] = useState<ProductState>({
		color: ["beige", "blue", "blue", "purple", "green"],
		price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
		size: ["L", "M", "S"],
		sort: "none",
	});

	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const { data } = await axios.post<QueryResult<ProductProps>[]>(
				"http://localhost:3000/api/products",
				{
					filter: {
						sort: filter.sort,
					},
				}
			);

			return data;
		},
	});

	const applyArrayFilter = ({
		category,
		value,
	}: {
		category: keyof Omit<typeof filter, "price" | "sort">;
		value: string;
	}) => {
		const isFilterApplied = filter[category].includes(value as never);

		if (isFilterApplied) {
			setFilter((prev) => ({
				...prev,
				[category]: prev[category].filter((v) => v !== value),
			}));
		} else {
			setFilter((prev) => ({
				...prev,
				[category]: [...prev[category], value],
			}));
		}
	};

	return (
		<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<section className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
				<h1 className="text-4xl font-bold tracking-tight">
					High-quality cotton selection
				</h1>

				<figure className="flex items-center">
					<DropdownMenu>
						<DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
							Sort
							<ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{SORT_OPTIONS.map((option) => (
								<button
									key={option.name}
									className={cn(
										"text-left w-full block px-4 py-2 text-sm",
										{
											"text-gray-900 bg-gray-100":
												option.value === filter.sort,
											"text-gray-500":
												option.value !== filter.sort,
										}
									)}
									onClick={() => {
										setFilter((prev) => ({
											...prev,
											sort: option.value,
										}));
									}}>
									{option.name}
								</button>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<button className="m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
						<Filter className="h-5 w-5" />
					</button>
				</figure>
			</section>

			<section className="pb-24 pt-6">
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
					{/* Filter */}
					<aside className="hidden lg:block">
						<ul className="border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 space-y-4">
							{SUBCATEGORIES.map((category) => (
								<li key={category.name}>
									<button
										disabled={!category.selected}
										className="disabled:cursor-not-allowed disabled:opacity-60">
										{category.name}
									</button>
								</li>
							))}
						</ul>

						<Accordion type="multiple" className="animate-none">
							{/* COLOR FILTER */}
							<AccordionItem value="color">
								<AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
									<span className="font-medium text-gray-900">
										Color
									</span>
								</AccordionTrigger>
								<AccordionContent className="pt-6 animate-none">
									<ul className="space-y-4">
										{COLOR_FILTERS.options.map(
											(option, optionIdx) => (
												<li
													key={option.value}
													className="flex items-center">
													<input
														type="checkbox"
														onChange={() => {
															applyArrayFilter({
																category:
																	"color",
																value: option.value,
															});
														}}
														checked={filter.color.includes(
															option.value
														)}
														id={`color-${optionIdx}`}
														className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
													/>
													<label
														htmlFor={`color-${optionIdx}`}
														className="ml-3 text-sm text-gray-600">
														{option.label}
													</label>
												</li>
											)
										)}
									</ul>
								</AccordionContent>
							</AccordionItem>

							{/* SIZE FILTER */}
							<AccordionItem value="size">
								<AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
									<span className="font-medium text-gray-900">
										Size
									</span>
								</AccordionTrigger>
								<AccordionContent className="pt-6 animate-none">
									<ul className="space-y-4">
										{SIZE_FILTERS.options.map(
											(option, optionIdx) => (
												<li
													key={option.value}
													className="flex items-center">
													<input
														type="checkbox"
														onChange={() => {
															applyArrayFilter({
																category:
																	"size",
																value: option.value,
															});
														}}
														checked={filter.size.includes(
															option.value
														)}
														id={`size-${optionIdx}`}
														className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
													/>
													<label
														htmlFor={`size-${optionIdx}`}
														className="ml-3 text-sm text-gray-600">
														{option.label}
													</label>
												</li>
											)
										)}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</aside>

					{/* Product grid */}
					<ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{products && products.length === 0 ? (
							<EmptyState />
						) : products ? (
							products.map((product) => (
								<Product product={product.metadata!} />
							))
						) : (
							new Array(12)
								.fill(null)
								.map((_, i) => <ProductSkeleton key={i} />)
						)}
					</ul>
				</div>
			</section>
		</main>
	);
}
function QueriesResult<T>() {
	throw new Error("Function not implemented.");
}
