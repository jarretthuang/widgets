export default function Input({
  placeholder,
  value,
  onChange,
  className,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={
        className +
        " " +
        "w-full rounded-lg border border-stone-400 bg-white bg-white/0 p-2 focus:border-stone-800 focus:outline-none dark:border-stone-700 dark:focus:border-gray-600"
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
