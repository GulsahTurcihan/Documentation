import { Separator } from "@/components/ui/separator";
import { Objects } from "@/components/attributes/objects";

function page() {
  return (
    <article className="flex flex-col w-full lg:px-14 md:px-8 px-4 text-sidebar-foreground">
      <h1 className="text-3xl font-semibold">The Product Model</h1>

      <Separator className="my-4 border-sidebar-border" />

      <h2 className="text-xl font-semibold">Attributes</h2>
      <Separator className="my-4 border-sidebar-border" />

      <Objects />
    </article>
  );
}
export default page;
