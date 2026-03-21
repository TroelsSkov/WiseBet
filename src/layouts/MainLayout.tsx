import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
import Chat from "../components/Chat"

function MainLayout() {
    return (
        <div className="h-full grid grid-cols-5 grid-rows-10 text-white">
            <header className="col-span-5 row-span-1 border-b-2 border-gray-800">
                <Navigation />
            </header>

            <main className="col-span-4 row-span-9 row-start-2">
                <Outlet />
            </main>

            <div className="row-span-9 col-start-5 row-start-2 border-l-2 border-gray-800">
                <Chat />
            </div>
        </div>
    )
}

export default MainLayout