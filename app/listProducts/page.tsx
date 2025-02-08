import ListProductComponent from "@/components/ListProductComponent";
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
        <ListProductComponent />
      </div>
    </HydrationBoundary>
  );
}
export default page;
