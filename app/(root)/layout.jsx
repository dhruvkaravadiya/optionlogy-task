import Navbar from "../components/Navbar.jsx";
import ReduxProvider from "../redux/redux-provider.jsx";
const Layout = ({ children }) => {
    return (
        <ReduxProvider>
            <main className="relative min-h-screen bg-slate-100">
                <Navbar />
                <div className="flex mx-auto w-full p-6">{children}</div>
            </main>
        </ReduxProvider>
    );
};

export default Layout;
