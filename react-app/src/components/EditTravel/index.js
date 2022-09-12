import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditTravel from "./EditTravel";

function EditTravelModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditTravel setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default EditTravelModal;
