"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Control } from "react-hook-form";
import { Input } from "../ui/input";
import clsx from "clsx";

type CustomFormSelectProps = {
  name: string;
  control?: Control<any>;
  items: { label: string; value: any }[];
  labelText?: string;
  value?: any; // 🟢 Seçili değeri belirlemek için
  onChange?: (value: any) => void; // 🟢 Seçim değiştiğinde çalışacak fonksiyon
};

export const CustomFormSelect = ({
  name,
  control,
  items,
  value,
  onChange,
}: CustomFormSelectProps) => {
  if (!control) {
    // 🟢 Eğer `control` yoksa `useState` ile çalışıyor demektir
    return (
      <FormItem>
        <Select onValueChange={onChange} defaultValue={value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    );
  }

  // 🟢 Eğer `control` varsa, React Hook Form ile çalıştır
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Hata mesajını burada doğrudan gösteriyoruz */}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export const CustomFormBooleanSelect = ({
  name,
  control,
  items,
}: CustomFormSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <Select
            onValueChange={(value) => {
              let newValue =
                value === "true" ? true : value === "false" ? false : "";
              field.onChange(newValue);
            }}
            defaultValue={String(field.value)}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={String(item.value)}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Hata mesajını burada doğrudan gösteriyoruz */}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  className?: string;
};

export const CustomFormField = ({
  name,
  control,
  className,
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              className={clsx(
                "p-2 border rounded-md", // Varsayılan stiller
                fieldState.invalid
                  ? "border-red-500" // Hatalı ise kırmızı border
                  : field.value
                  ? "border-green-500" // Doğru ise yeşil border
                  : "border-gray-300",
                className // Kullanıcının eklemek istediği ek stiller
              )}
            />
          </FormControl>
          {/* Hata mesajını burada gösteriyoruz */}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
