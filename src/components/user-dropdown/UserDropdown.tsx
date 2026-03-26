import { Link } from "react-router-dom";

function UserDropdown({ visible }: { visible: boolean }) {
    return (
        <div className={`z-10 ${visible ? '' : 'hidden'} bg-gray-800 border border-gray-900 rounded w-44 absolute right-0 mt-2 mr-4`}>
            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                <li>
                    <Link to="/logout" className="flex items-center">
                        <span className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Log ud</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default UserDropdown