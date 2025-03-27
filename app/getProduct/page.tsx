import GetProductComponent from "@/components/GetProductComponent";
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
        <GetProductComponent />
      </div>
    </HydrationBoundary>
  );
}
export default page;
