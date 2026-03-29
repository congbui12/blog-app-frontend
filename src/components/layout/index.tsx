import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-radial">
      <Header />

      <main className="grow mx-auto w-full max-w-4xl px-4 py-8">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
