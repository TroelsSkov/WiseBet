import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Button from "../form/Button";

function UserMenu() {
    function buttonClicked() {
        alert("User menu clicked"); // todo: make dropdown
    }
    return (
        <Button variant="round" onClick={buttonClicked}>
            <FontAwesomeIcon icon={faUser} />
        </Button>
    )
}

export default UserMenu