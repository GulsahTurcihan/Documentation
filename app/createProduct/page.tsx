import CreateProductComponent from "@/components/CreateProductComponent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

function CreateProduct() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="article">
        <CreateProductComponent />
      </div>
    </HydrationBoundary>
  );
}
export default CreateProduct;
