import { ProductProps } from "@/db";

const Product = ({ product }: { product: ProductProps }) => {
	return (
		<section className="group relative">
			<figure className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
				<img
					src={product.imageId}
					alt="product image"
					className="h-full w-full object-cover object-center"
				/>
			</figure>

			<div className="mt-4 flex justify-between">
				<article>
					<h3 className="text-sm text-gary-700">{product.name}</h3>
					<p className="mt-1 text-sm text-gary-500">
						Size {product.size.toUpperCase()}, {product.color}
					</p>
				</article>

				<p className="text-sm font-medium text-gray-900">
					{product.size}
				</p>
			</div>
		</section>
	);
};

export default Product;
