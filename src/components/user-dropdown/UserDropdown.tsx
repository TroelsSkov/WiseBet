import { apiService } from "../../services/apiService";
import type { User } from "../../types/user";

interface UserDropdownProps {
    visible: boolean;
    user: User;
}

function UserDropdown({ visible, user }: UserDropdownProps) {
    async function logoutUser() {
        const { error } = await apiService.get(`/logout`);
        if (!error) console.log("[UserDropdown] refetch()");
    }

    return (
        <div className={`z-10 ${visible ? '' : 'hidden'} bg-gray-800 border border-gray-900 rounded w-44 absolute right-0 mt-2 mr-4`}>
            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                <li>
                    <span>
                        {user?.username ?? "UNKNOWN USERNAME"}
                    </span>
                </li>
                <li>
                    <button onClick={() => logoutUser()} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                        Log ud
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default UserDropdown