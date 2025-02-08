import { Categories } from "./categories";
import { Media } from "./media";
import { Options } from "./options";
import { PriceData } from "./priceData";
import { Variants } from "./variants";

export const Objects = () => {
  return (
    <div className="flex flex-col gap-2 border border-sidebar-border p-4 rounded-md">
      <h3 className="text-xs font-normal border-b border-sidebar-border pb-2 text-sidebar-ring">
        object
      </h3>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          id <span className="p-span">string</span>
        </h3>
        <p className="p-description">The ID of the product.</p>{" "}
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          title <span className="p-span">string</span>
        </h3>
        <p className="p-description">Title of the product.</p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          description <span className="p-span">string</span>
        </h3>
        <p className="p-description">Description of the product.</p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          type <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          Type of the product.
          <br />
          <br />
          <span className="tag">physical</span>{" "}
          <span className="tag">digital</span>
        </p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          dateCreated <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          The date and time of the initial product listing. yyyy-MM-ddTHH:mm:ssZ
          format is used (e.g., 2022-07-21T13:24:51+0300).
        </p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          dateUpdated <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          The date and time of the last product update. yyyy-MM-ddTHH:mm:ssZ
          format is used (e.g., 2022-07-21T13:24:51+0300).
        </p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          url <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          The URL of the product.
          <br />
          <span className="text-xs">
            <a href="https://www.shopier.com/696547">
              (e.g., https://www.shopier.com/696547)
            </a>
          </span>
        </p>
      </div>

      {/* Media */}
      <Media />

      {/* priceData */}
      <PriceData />

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          stockStatus <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          Current stock status of the product.
          <br />
          <br />
          <span className="tag">inStock</span>
          <span className="tag">outOfStock</span>
        </p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          stockQuantity <span className="p-span">number</span>
        </h3>
        <p className="p-description">Current stock quantity of the product.</p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          shippingPayer <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          Represents who pays for shipping during dispatch or delivery.
          <br />
          <br />
          <span className="tag">sellerPays</span>
          <span className="tag">buyerPays</span>
        </p>
      </div>

      {/*categories  */}
      <Categories />

      {/* variants */}
      <Variants />

      {/* options */}
      <Options />

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          singleOption <span className="p-span">boolean</span>
        </h3>
        <p className="p-description">
          Represents whether a single option or multiple options can be selected
          during checkout.
        </p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          customListing <span className="p-span">boolean</span>
        </h3>
        <p className="p-description">
          Represents whether the product is a custom listing or standard one.
        </p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          customNote <span className="p-span">string</span>
        </h3>
        <p className="p-description">
          Overrides the placeholder for note to seller field. Used for
          collecting a custom information from the buyer during checkout.
        </p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          placementScore <span className="p-span">number</span>
        </h3>
        <p className="p-description">
          Placement score of the product. Products with higher values are placed
          first in the store.
        </p>
      </div>

      <div className="flex flex-col gap-[0.25rem]">
        <h3 className="p-title">
          dispatchDuration <span className="p-span">number</span>
        </h3>
        <p className="text-sm">
          Dispatch duration in terms of days from seller to shipping company.
        </p>
      </div>
    </div>
  );
};
