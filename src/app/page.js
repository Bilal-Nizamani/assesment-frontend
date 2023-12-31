import HomePage from "@/components/HomePage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
