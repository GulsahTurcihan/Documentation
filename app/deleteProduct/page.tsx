import DeleteProductComponent from "@/components/DeleteProductComponent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

function page() {
  {
    const queryClient = new QueryClient();
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="article">
          <DeleteProductComponent />
        </div>
      </HydrationBoundary>
    );
  }
}
export default page;
