"use client";

import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  pendingText?: string;
  formAction: any;
};

export function SubmitButton({ children, pendingText = "Submitting...", ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </button>
  );
}
