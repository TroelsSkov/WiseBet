import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Button from "../form/Button";
import UserDropdown from "../user-dropdown/UserDropdown";
import { useState } from "react";
import type { User } from "../../types/user";

interface UserMenuProps {
    user: User;
}

function UserMenu({ user }: UserMenuProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

        return (
        <span>
            <Button variant="round" onClick={() => setDropdownVisible(!dropdownVisible)}>
                <FontAwesomeIcon icon={faUser} />
            </Button>
            <UserDropdown visible={dropdownVisible} user={user} />
        </span>
    )
}

export default UserMenu