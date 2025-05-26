interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg border border-border">
          {title && (
            <div className="px-6 pt-8 pb-4 border-b border-border">
              <h1 className="text-2xl font-semibold text-foreground text-center">
                {title}
              </h1>
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
