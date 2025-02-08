export const Options = () => {
  return (
    <div className="flex flex-col gap-[0.25rem]">
      <h3 className="p-title">
        options <span className="p-span">array of object</span>
      </h3>
      <p className="text-sm">List of options of the product.</p>
      <div className="flex flex-col gap-[0.25rem]  border border-sidebar-border p-2 rounded-md ">
        <h3 className="text-xs font-normal border-b border-sidebar-border pb-2 text-sidebar-ring">
          object
        </h3>
        <h3 className="p-title">
          id <span className="p-span">string</span>
        </h3>
        <p className="p-description">The ID of the option.</p>
        <h3 className="p-title">
          title <span className="p-span">string</span>
        </h3>
        <p className="p-description">The title of the option.</p>
        <h3 className="p-title">
          price <span className="p-span">string</span>
        </h3>
        <p className="text-sm">The price of the option.</p>
      </div>
    </div>
  );
};
