import type { ReactNode } from "react";

const control =
  "h-11 w-full rounded-card border bg-paper px-3.5 text-[0.95rem] text-ink-900 transition-colors placeholder:text-mist-400 focus:outline-none";

function tone(hasError: boolean) {
  return hasError
    ? "border-critical focus:border-critical"
    : "border-mist-300 focus:border-brand-500";
}

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-900">
        {label}
        {required ? <span className="ml-1 text-critical">*</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-xs font-medium text-critical">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-mist-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput({
  id,
  name,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; name: string; error?: boolean }) {
  return (
    <input
      id={id}
      name={name}
      aria-invalid={error || undefined}
      className={`${control} ${tone(Boolean(error))}`}
      {...props}
    />
  );
}

export function SelectInput({
  id,
  name,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  name: string;
  error?: boolean;
  children: ReactNode;
}) {
  return (
    <select
      id={id}
      name={name}
      aria-invalid={error || undefined}
      className={`${control} ${tone(Boolean(error))} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%237d8d9d%22 stroke-width=%221.4%22 stroke-linecap=%22round%22><path d=%22M2.5 4.5 6 8l3.5-3.5%22/></svg>')] bg-[length:12px] bg-[position:right_0.9rem_center] bg-no-repeat pr-9`}
      {...props}
    >
      {children}
    </select>
  );
}

export function TextArea({
  id,
  name,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  name: string;
  error?: boolean;
}) {
  return (
    <textarea
      id={id}
      name={name}
      aria-invalid={error || undefined}
      className={`w-full rounded-card border bg-paper px-3.5 py-3 text-[0.95rem] text-ink-900 transition-colors placeholder:text-mist-400 focus:outline-none ${tone(Boolean(error))}`}
      {...props}
    />
  );
}
