import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Button from "../form/Button";
import UserDropdown from "../user-dropdown/UserDropdown";
import { useState } from "react";

function UserMenu() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

        return (
        <span>
            <Button variant="round" onClick={() => setDropdownVisible(!dropdownVisible)}>
                <FontAwesomeIcon icon={faUser} />
            </Button>
            <UserDropdown visible={dropdownVisible} />
        </span>
    )
}

export default UserMenu