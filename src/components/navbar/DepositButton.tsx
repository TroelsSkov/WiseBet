import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../form/Button"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import Modal from "../ui/Modal";
import Input from "../form/Input";
import { useState } from "react";

function DepositButton() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <span>
            <Button variant="pill" color="green" onClick={() => setModalVisible(true)}>
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp;
                <p>Indbetal</p>
            </Button>
            <Modal visible={modalVisible} title="Indbetal">
                <p>Indtast beløb:</p>
                <Input type="number" placeholder="Beløb at indbetale" />
                <div className="flex justify-end gap-4">
                    <Button onClick={() => setModalVisible(false)}>Luk</Button>
                    <br />
                    <Button color="green" onClick={() => alert("Indbetalingshandling")}>Indbetal</Button>
                </div>
            </Modal>
        </span>
    )
}

export default DepositButton