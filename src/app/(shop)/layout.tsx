import { Footer, Sidebar, TopMenu } from "@/components";
import './layout.css'

export default function ShopLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header className="z-30 sticky-position bg-green-200">
                <TopMenu />
                <Sidebar />
            </header>
            <main className="z-10 overflow-hidden sm:px-10" style={{ minHeight: `calc(100vh - 56px )` }}>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}