export const PriceData = () => {
  return (
    <div className="flex flex-col gap-[0.25rem]">
      {" "}
      <h3 className="p-title">
        priceData <span className="p-span">object</span>
      </h3>
      <p className="text-sm">Details of product price information.</p>
      <div className="flex flex-col gap-[0.25rem]  border border-sidebar-border p-2 rounded-md ">
        <h3 className="p-title">
          currency <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          The currency of the product price.
          <br />
          <br />
          <span className="tag">USD</span>
          <span className="tag">EUR</span>
          <span className="tag">TRY</span>
        </p>
        <h3 className="p-title">
          price <span className="p-span">number</span>
        </h3>
        <p className="p-description">Unit price of the product.</p>
        <h3 className="p-title">
          discount <span className="p-span">boolean</span>
        </h3>
        <p className="p-description">
          Represents whether there is a product based discount.
        </p>
        <h3 className="p-title">
          discountedPrice <span className="p-span">string</span>
        </h3>
        <p className="p-description">Discounted price of the product.</p>
        <h3 className="p-title">
          shippingPrice <span className="p-span">string</span>
        </h3>
        <p className="text-sm">Shipping price of the product.</p>
      </div>
    </div>
  );
};
