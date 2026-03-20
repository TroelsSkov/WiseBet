import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
import Chat from "../components/Chat"

function MainLayout() {
    return (
        <div className="h-full grid grid-cols-5 grid-rows-10 bg-red-500">
            <header className="col-span-5 row-span-1">
                <Navigation />
            </header>

            <main className="col-span-4 row-span-9 row-start-2 bg-green-500">
                <Outlet />
            </main>

            <div className="row-span-9 col-start-5 row-start-2 bg-blue-500">
                <Chat />
            </div>
        </div>
    )
}

export default MainLayout