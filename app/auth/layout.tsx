
import ToastNotification from "@/components/ui/ToastNotification";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl flex items-center justify-center mx-auto">{children}</div>
      </div>

      <ToastNotification />
    </>
  );
}
