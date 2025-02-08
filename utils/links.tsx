import { Home, Package, List, Plus, Search, Edit, Trash } from "lucide-react";

import getIcon from "@/public/getIcon.svg";
import postIcon from "@/public/postIcon.svg";
import putIcon from "@/public/putIcon.svg";
import deleteIcon from "@/public/deleteIcon.svg";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  tag?: React.ReactNode;
};

export const getStyle = (tag: string): React.ReactNode => {
  switch (tag) {
    case "GET":
      return <Image src={getIcon} alt="GET" width={48} height={48} priority />;
    case "POST":
      return (
        <Image src={postIcon} alt="POST" width={48} height={48} priority />
      );
    case "PUT":
      return <Image src={putIcon} alt="PUT" width={48} height={48} priority />;
    case "DELETE":
      return (
        <Image src={deleteIcon} alt="DELETE" width={48} height={48} priority />
      );
    default:
      return <Image src={getIcon} alt="GET" width={48} height={48} priority />;
  }
};

const links: NavLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Product Model",
    href: "/productModel",
    icon: <Package className="h-4 w-4" />,
  },
  {
    label: "Products List",
    href: "/listProducts",
    icon: <List className="h-4 w-4" />,
    tag: "GET",
  },

  {
    label: "Create Product",
    href: "/createProduct",
    icon: <Plus className="h-4 w-4" />,
    tag: "POST",
  },
  {
    label: "Get Product",
    href: "/getProduct",
    icon: <Search className="h-4 w-4" />,
    tag: "GET",
  },
  {
    label: "Update Product",
    href: "/updateProduct",
    icon: <Edit className="h-4 w-4" />,
    tag: "PUT",
  },
  {
    label: "Delete Product",
    href: "/deleteProduct",
    icon: <Trash className="h-4 w-4" />,
    tag: "DELETE",
  },
];

export default links;
