import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import EditLocation from "./EditLocation";

function EditLocationModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal  && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditLocation setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default EditLocationModal;
