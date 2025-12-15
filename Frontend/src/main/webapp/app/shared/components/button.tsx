import React from 'react';
import { Button, ButtonProps, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { Loader2, LucideIcon } from 'lucide-react';
import { Translate } from 'react-jhipster';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface CustomButtonProps extends ButtonProps {
  icon?: LucideIcon;
  isLoading?: boolean;
  name?: string;
  contentKey?: string;
}

export function CustomButton({
  className,
  variant,
  size,
  icon: Icon,
  name,
  isLoading = false,
  disabled,
  contentKey,
  ...props
}: CustomButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} disabled={isLoading || disabled} {...props}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon && <Icon className="h-4 w-4" />}
      {contentKey ? <Translate contentKey={contentKey}>{name}</Translate> : name}
    </Button>
  );
}
