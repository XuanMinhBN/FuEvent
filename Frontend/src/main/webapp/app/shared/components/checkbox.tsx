import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from 'reactstrap';
import { cn } from 'app/lib/utils';

interface CustomCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  label: React.ReactNode;
  description?: string;
  containerClassName?: string;
}

export function CustomCheckbox({ id, label, description, containerClassName, className, disabled, ...props }: CustomCheckboxProps) {
  return (
    <div className={cn('flex items-start space-x-3 space-y-0', containerClassName)}>
      <Checkbox id={id} className={cn('mt-0.5', className)} disabled={disabled} {...props} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={cn('text-sm font-medium leading-none cursor-pointer', disabled && 'cursor-not-allowed opacity-70')}>
          {label}
        </Label>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
