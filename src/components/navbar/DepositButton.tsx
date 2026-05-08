import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../form/Button"
// import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Unused
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import Modal from "../ui/Modal";
import Input from "../form/Input";
import { useState } from "react";
import { apiService } from "../../services/apiService";
import { toast } from "react-toastify";

function DepositButton() {
    const notify = (message: string) => toast.success(message);
    const notifyError = (message: string) => toast.error(message);
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState("");

    async function handleDeposit(e: React.SubmitEvent) {
        e.preventDefault();

        if (Number(amount) <= 0) {
            notifyError("Beløbet skal være større end 0.");
            return;
        }

        try {
            const { error } = await apiService.post("/Api/Users/Deposit", { amount: amount });

            if (error) {
                notifyError(`Indbetaling mislykkedes: ${error}`);
                return;
            }

            setModalVisible(false)
            notify(`Der er indbetalt ${amount} WiC på din konto!`);
        }
        catch (err) {
            console.error(`Indbetaling mislykkedes: ${err}`);
            notifyError(`Indbetaling mislykkedes: ${err}`);
        }
    }

    return (
        <span>
            <Button variant="pill" color="green" onClick={() => setModalVisible(true)}>
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp;
                <p>Indbetal</p>
            </Button>
            <Modal visible={modalVisible} title="Indbetal">
                <form onSubmit={handleDeposit} className="space-y-6">
                    <label htmlFor="amount" className="">Beløb</label>
                    <Input id="amount" type="number" onChange={e => { setAmount(e.target.value) }} placeholder="Beløb at indbetale" />
                    <div className="flex justify-end gap-4">
                        <Button onClick={() => setModalVisible(false)}>Luk</Button>
                        <Button color="green">Indbetal</Button>
                    </div>
                </form>
            </Modal>
        </span>
    )
}

export default DepositButton