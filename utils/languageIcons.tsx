import Image from "next/image";
import javascriptIcon from "../public/icons/javascriptIcon.png";
import typescriptIcon from "../public/icons/typescriptIcon.png";
import pythonIcon from "../public/icons/pythonIcon.svg";
import httpIcon from "../public/icons/httpIcon.svg";
import phpIcon from "../public/icons/phpIcon.png";
import csharpIcon from "../public/icons/c-sharpIcon.svg";
import rubyIcon from "../public/icons/rubyIcon.png";
import swiftIcon from "../public/icons/swiftIcon.png";
import javaIcon from "../public/icons/javaIcon.png";
import shellIcon from "../public/icons/shellIcon.png";
import kotlinIcon from "../public/icons/kotlinIcon.svg";
import rustIcon from "../public/icons/rustIcon.png";
import cppIcon from "../public/icons/cppIcon.svg";
import clojureIcon from "../public/icons/clojureIcon.svg";
import objectivecIcon from "../public/icons/objectivecIcon.svg";
import powershellIcon from "../public/icons/powershellIcon.png";
import nodejsIcon from "../public/icons/nodejsIcon.svg";

type LanguageIcons = {
  label: string;
  icon: string;
};

export const getIconStyle = (icon: string): React.ReactNode => {
  switch (icon) {
    case "javascript":
      return (
        <Image
          src={javascriptIcon}
          alt="JavaScript Icon"
          height={16}
          width={16}
          className="pb-1"
        />
      );
    case "typescript":
      return (
        <Image
          src={typescriptIcon}
          alt="TypeScript Icon"
          height={16}
          width={16}
          className="pb-1"
        />
      );
    case "python":
      return (
        <Image src={pythonIcon} alt="Python Icon" height={14} width={14} />
      );
    case "node":
      return <Image src={nodejsIcon} alt="Node Icon" height={18} width={18} />;
    case "http":
      return (
        <Image
          src={httpIcon}
          alt="HTTP Icon"
          height={22}
          width={22}
          className="pb-2"
        />
      );
    case "php":
      return <Image src={phpIcon} alt="PHP Icon" height={20} width={20} />;
    case "shell":
      return <Image src={shellIcon} alt="Shell Icon" height={20} width={20} />;
    case "csharp":
      return <Image src={csharpIcon} alt="C# Icon" height={16} width={16} />;
    case "ruby":
      return <Image src={rubyIcon} alt="Ruby Icon" height={16} width={16} />;
    case "swift":
      return <Image src={swiftIcon} alt="Swift Icon" height={16} width={16} />;
    case "java":
      return <Image src={javaIcon} alt="Java Icon" height={16} width={16} />;
    case "kotlin":
      return (
        <Image src={kotlinIcon} alt="Kotlin Icon" height={16} width={16} />
      );
    case "rust":
      return <Image src={rustIcon} alt="Rust Icon" height={20} width={20} />;
    case "cpp":
      return <Image src={cppIcon} alt="C++ Icon" height={16} width={16} />;
    case "clojure":
      return (
        <Image src={clojureIcon} alt="Clojure Icon" height={20} width={20} />
      );
    case "objective-c":
      return (
        <Image
          src={objectivecIcon}
          alt="Objective-C Icon"
          height={18}
          width={18}
        />
      );
    case "powershell":
      return (
        <Image
          src={powershellIcon}
          alt="PowerShell Icon"
          height={18}
          width={18}
        />
      );

    default:
      return (
        <Image
          src={javascriptIcon}
          alt="JavaScript Icon"
          height={20}
          width={20}
        />
      );
  }
};

export const languageIcons: LanguageIcons[] = [
  { label: "JavaScript", icon: "javascript" },
  { label: "TypeScript", icon: "typescript" },
  { label: "Python", icon: "python" },
  { label: "HTTP", icon: "http" },
  { label: "PHP", icon: "php" },
  { label: "Shell", icon: "shell" },
  { label: "CSharp", icon: "csharp" },
  { label: "Ruby", icon: "ruby" },
  { label: "Swift", icon: "swift" },
  { label: "Java", icon: "java" },
  { label: "Kotlin", icon: "kotlin" },
  { label: "Rust", icon: "rust" },
  { label: "C++", icon: "cpp" },
  { label: "Clojure", icon: "clojure" },
  { label: "Objective-C", icon: "objective-c" },
  { label: "PowerShell", icon: "powershell" },
  { label: "Node", icon: "node" },
];
