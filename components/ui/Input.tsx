type InputTypesProps = {
  name: string;
  defaultValue: string 
  type: string
  placeholder?: string 
};

export default function Input({
  name,
  defaultValue,
  ...props
}: InputTypesProps) {
  return (
    <div className="flex flex-col">
      
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        required
        {...props}
        className={`border text-[16px] p-2 rounded-lg w-full border-gray-300 bg-white`}
      />
    </div> 
  );
}
