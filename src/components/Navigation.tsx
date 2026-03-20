import PlayTimeCounter from "./PlayTimeCounter"
import viteLogo from "/vite.svg"

function Navigation() {
    return (
        <>
            <div className=" h-full flex items-center">
                <div className="flex-1">
                    <a href="/"><img src={viteLogo} className="logo" alt="Vite logo" /></a>
                </div>

                <div className="flex flex-1 justify-center">
                    <PlayTimeCounter />
                </div>

                <div className="flex flex-1 justify-end">
                    User menu n stuff
                </div>
            </div>
        </>
    )
}

export default Navigation