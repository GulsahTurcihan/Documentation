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

// Custom Form Select (Tekil Seçim)

type CustomFormSelectProps = {
  name: string;
  control?: Control<any>;
  items: { label: string; value: any }[];
  labelText?: string;
  value?: any;
  onChange?: (value: any) => void;
  id?: string;
  className?: string;
};

export const CustomFormSelect = ({
  name,
  control,
  items,
  value,
  onChange,
  id,
  className,
}: CustomFormSelectProps) => {
  return control ? (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <Select onValueChange={field.onChange} value={field.value ?? ""}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {(items ?? []).map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  id={id}
                  className={className}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  ) : (
    <FormItem>
      <Select onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
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
};

// Custom Boolean Select (true/false)

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
            value={field.value !== undefined ? String(field.value) : "false"}
            onValueChange={(value) => field.onChange(value === "true")}
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
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

// Custom Form Input Field
type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  className?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate?: (data: any) => void;
};

export const CustomFormField = ({
  name,
  control,
  className,
  onChange,
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
              onChange={(e) => {
                onChange && onChange(e);
                field.onChange(e);
              }}
              id={name}
              value={field.value ?? ""}
              className={clsx(
                "p-2 border rounded-md",
                fieldState.invalid
                  ? "border-red-500"
                  : field.value
                  ? "border-green-500"
                  : "border-gray-300",
                className
              )}
            />
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
