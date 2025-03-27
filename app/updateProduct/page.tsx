import UpdateProductComponent from "@/components/UpdateProductComponent";
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
        <UpdateProductComponent />
      </div>
    </HydrationBoundary>
  );
}
export default page;
