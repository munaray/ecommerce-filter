"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

// a cache that can be use to keep track of data from api route
const client = new QueryClient();

const Providers = ({ children }: PropsWithChildren<{}>) => {
	return (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);
};

export default Providers;
