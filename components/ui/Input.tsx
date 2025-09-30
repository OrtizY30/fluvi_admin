type InputTypesProps = {
  name: string;
  defaultValue: string 
  errors: string[];
  type: string
  placeholder?: string 
};

export default function Input({
  name,
  defaultValue,
  errors,
  ...props
}: InputTypesProps) {
  return (
    <div className="flex flex-col">
      {errors && <p className="text-red-500 text-sm mt-1">{errors[0]}</p>}
      
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        required
        {...props}
        className={`border p-3 rounded-lg w-full ${
          errors[0] ? "border-red-500" : "border-gray-300"
        }`}
      />
    </div>
  );
}
