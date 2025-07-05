export const metadata = {
  title: "Eruotor Stores",
  description: "Manage your Eruotor store settings and preferences.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
 