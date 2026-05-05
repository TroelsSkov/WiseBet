import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../form/Button"
// import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Unused
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import Modal from "../ui/Modal";
import Input from "../form/Input";
import { useState } from "react";
import { apiService } from "../../services/apiService";

function DepositButton() {
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState("");

    async function handleDeposit(e: React.SubmitEvent) {
        e.preventDefault();

        const { ok, error } = await apiService.post("/Api/Users/Auth/Login", { amount: amount });

        if (!ok) {
            // Show error modal
            return;
        }

        // show success modal with amount
    }

    return (
        <span>
            <Button variant="pill" color="green" onClick={() => setModalVisible(true)}>
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp;
                <p>Indbetal</p>
            </Button>
            <Modal visible={modalVisible} title="Indbetal">
                <form onSubmit={handleDeposit}>
                    <p>Indtast beløb:</p>
                    <Input type="number" onChange={e => { setAmount(e.target.value) }} placeholder="Beløb at indbetale" />
                    <div className="flex justify-end gap-4">
                        <Button onClick={() => setModalVisible(false)}>Luk</Button>
                        <br />
                        <Button color="green">Indbetal</Button>
                    </div>
                </form>
            </Modal>
        </span>
    )
}

export default DepositButton