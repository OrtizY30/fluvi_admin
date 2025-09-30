

export default function ErrorMessage({children } : {children: React.ReactNode}) {
  return (
   <p className="text-center my-4 bg-red-50 border-3 border-red-400 text-slate-700 font-bold p-3 uppercase text-sm">{children}</p>
  )
}
