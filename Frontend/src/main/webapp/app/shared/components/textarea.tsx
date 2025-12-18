import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Translate } from 'react-jhipster';

interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  contentKey?: string;
  isLoading?: boolean;
  placeholder?: any;
}

export function CustomTextarea({ id, className, label, placeholder, contentKey, isLoading, disabled, ...props }: CustomTextareaProps) {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor={id}>{contentKey ? <Translate contentKey={contentKey}>{label}</Translate> : label}</Label>
      <Textarea
        placeholder={contentKey ? <Translate contentKey={contentKey}>{placeholder}</Translate> : placeholder}
        id={id}
        disabled={isLoading || disabled}
        {...props}
      />
    </div>
  );
}
