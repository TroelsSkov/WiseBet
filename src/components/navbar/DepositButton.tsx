import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../form/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";

function DepositButton() {
    function handleClick() {
        alert('Deposit clicked'); // TODO: open dialog? redirect?
    }

    return (
        <span>
            <Button variant="pill" color="green" onClick={handleClick}>
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp;
                <p>Indbetal</p>
            </Button>
        </span>
    )
}

export default DepositButton