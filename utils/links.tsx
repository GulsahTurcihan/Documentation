import { Home, Package, List, Plus, Search, Edit, Trash } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  tag?: string;
};

export const getStyle = (tag: string) => {
  switch (tag) {
    case "GET":
      return "bg-green-600 text-white px-[0.5rem] rounded-full text-[0.5rem] tracking-wider ";
    case "POST":
      return "bg-blue-600 text-white px-[0.5rem] rounded-full text-[0.5rem] tracking-wider";
    case "PUT":
      return "bg-yellow-600 text-white px-[0.5rem] rounded-full text-[0.5rem] tracking-wider";
    case "DELETE":
      return "bg-red-600 text-white px-[0.5rem] rounded-full text-[0.5rem] tracking-wider";
    default:
      return "bg-gray-600 text-white px-[0.5rem] rounded-full text-[0.5rem] tracking-wider";
  }
};

const links: NavLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Products List",
    href: "/listProducts",
    icon: <List className="h-4 w-4" />,
    tag: "GET",
  },
  {
    label: "Product Model",
    href: "/productModel",
    icon: <Package className="h-4 w-4" />,
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
