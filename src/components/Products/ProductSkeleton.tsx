const ProductSkeleton = () => {
	return (
		<figure className="relative animate-pulse">
			<figure className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
				<div className="h-full w-full bg-gray-200" />
			</figure>
			<figure className="mt-4 flex flex-col gap-2">
				<div className="bg-gray-200 h-4 w-full" />
				<div className="bg-gray-200 h-4 w-full" />
			</figure>
		</figure>
	);
};

export default ProductSkeleton;
