import { CustomFormSelect } from "@/components/forms/FormComponents";

const SUPPORTED_LANGUAGES = [
  { label: "JavaScript (Node.js)", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "PHP", value: "php" },
  { label: "Shell", value: "shell" },
];

type LanguageSelectorProps = {
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
};

const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <h3 className="text-lg font-semibold">Choose Language:</h3>
      <CustomFormSelect
        name="language"
        items={SUPPORTED_LANGUAGES}
        onChange={onLanguageChange}
        value={selectedLanguage}
      />
    </div>
  );
};

export default LanguageSelector;
