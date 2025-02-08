export const Media = () => {
  return (
    <div className="flex flex-col gap-[0.25rem]">
      <h3 className="p-title">
        media <span className="p-span">array of objects</span>
      </h3>
      <p className="text-sm pb-2">Details of product media files.</p>
      <div className="flex flex-col gap-[0.25rem]  border border-sidebar-border p-2 rounded-md ">
        <h3 className="text-xs font-normal border-b border-sidebar-border pb-2 text-sidebar-ring">
          object
        </h3>
        <h3 className="p-title">
          id <span className="p-span">string</span>
        </h3>
        <p className="p-description">The ID of media file.</p>
        <h3 className="p-title">
          type <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          The type of media file.
          <br />
          <br />
          <span className="tag">image</span>
        </p>
        <h3 className="p-title">
          url <span className="p-span">string</span>
        </h3>
        <p className="text-sm">The URL of the media file.</p>
      </div>
    </div>
  );
};
