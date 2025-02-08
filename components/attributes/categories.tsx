export const Categories = () => {
  return (
    <div className="flex flex-col gap-[0.25rem]">
      <h3 className="p-title">
        categories <span className="p-span">array of object</span>
      </h3>
      <p className="text-sm">List of categories that product belongs to.</p>
      <div className="flex flex-col gap-[0.25rem]  border border-sidebar-border p-2 rounded-md ">
        <h3 className="text-xs font-normal border-b border-sidebar-border pb-2 text-sidebar-ring">
          object
        </h3>
        <h3 className="p-title">
          id <span className="p-span">string</span>
        </h3>
        <p className="p-description">The ID of the category.</p>
        <h3 className="p-title">
          title <span className="p-span">string</span>
        </h3>
        <p className="text-sm">The title of category.</p>
      </div>
    </div>
  );
};
