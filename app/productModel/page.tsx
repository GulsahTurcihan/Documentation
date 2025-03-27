import ProductModelComponent from "@/components/ProductModelComponent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

function page() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="article">
        <ProductModelComponent />
      </div>
    </HydrationBoundary>
  );
}
export default page;
