import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from 'app/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  className,
  disabled,
  isLoading = false,
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled || isLoading}>
      <SelectTrigger className={cn('w-full', className)}>
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent>
        {label && <SelectLabel>{label}</SelectLabel>}
        {options.length > 0 ? (
          options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-sm text-muted-foreground text-center">No options found</div>
        )}
      </SelectContent>
    </Select>
  );
}
