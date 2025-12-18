import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputProps } from 'reactstrap';
import { Translate } from 'react-jhipster';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  contentKey?: string;
  isLoading?: boolean;
  placeholder?: any;
}

export function CustomInput({
  id,
  type,
  placeholder,
  className,
  size,
  label,
  isLoading = false,
  disabled,
  contentKey,
  ...props
}: CustomInputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>{contentKey ? <Translate contentKey={contentKey}>{label}</Translate> : label}</Label>
      <Input
        type={type}
        id={id}
        placeholder={contentKey ? <Translate contentKey={contentKey}>{placeholder}</Translate> : placeholder}
        className={className}
        size={size}
        disabled={isLoading || disabled}
        {...props}
      />
    </div>
  );
}
