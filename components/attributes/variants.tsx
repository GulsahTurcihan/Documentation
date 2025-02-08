export const Variants = () => {
  return (
    <div className="flex flex-col gap-[0.25rem]">
      <h3 className="p-title">
        variants <span className="p-span">array of object</span>
      </h3>
      <p className="text-sm">List of variants of the product.</p>
      <div className="flex flex-col gap-[0.25rem]  border border-sidebar-border p-2 rounded-md ">
        <h3 className="text-xs font-normal border-b border-sidebar-border pb-2 text-sidebar-ring">
          object
        </h3>
        <h3 className="p-title">
          variationId <span className="p-span">array of string</span>
        </h3>
        <p className="p-description">The ID of the variant.</p>
        <h3 className="p-title">
          variationTitle <span className="p-span">array of string</span>
        </h3>
        <p className="p-description">The title of the variant.</p>
        <h3 className="p-title">
          selectionId <span className="p-span">array of string</span>
        </h3>
        <p className="p-description">The ID of selection.</p>
        <h3 className="p-title">
          selectionTitle <span className="p-span">array of string</span>
        </h3>
        <p className="p-description">The title of selection.</p>
        <h3 className="p-title">
          stockStatus <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          Current stock status of the variant.
          <br />
          <br />
          <span className="tag">inStock</span>
          <span className="tag">outOfStock</span>
        </p>
        <h3 className="p-title">
          stockQuantity <span className="p-span">number</span>
        </h3>
        <p className="text-sm">Current stock quantity of the variant.</p>
      </div>
    </div>
  );
};
