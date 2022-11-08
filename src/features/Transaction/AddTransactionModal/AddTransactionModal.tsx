import { toNumber } from "lodash";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch } from "../../../app/hooks";
import InputButton from "../../../components/InputButton/InputButton";
import TextInput from "../../../components/TextInput/TextInput";
import { storeTransaction } from "../transactionSlice";

const AddTransactionModal = (props: any) => {
    const [transactionID, setTransactionID] = useState();
    const [studentName, setStudentName] = useState();
    const [process, setProcess] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [date, setDate] = useState();
    const [status, setStatus] = useState();
    const dispatch = useAppDispatch();

    const handleAddTransaction = () => {
        dispatch(storeTransaction({
            total_amount: toNumber(totalAmount),
            statue: toNumber(status),
            student: toNumber(studentName),
            school: toNumber(process),
            location: toNumber(transactionID),
            message: "",
        }));
        return props?.onClose();
    };

    return (
        <>
            <Modal
                show={props?.show}
                onHide={props?.onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextInput value={transactionID} onChange={(value: any) => setTransactionID(value)} name="transaction_id" title="Transaction ID" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }} />
                    <TextInput value={studentName} onChange={(value: any) => setStudentName(value)} name="student_name" title="Student Name" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={process} onChange={(value: any) => setProcess(value)} name="process" title="Process" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={totalAmount} onChange={(value: any) => setTotalAmount(value)} name="total_amount" title="Total Amount" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={date} onChange={(value: any) => setDate(value)} name="date" title="YYYY/MM/DD" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                    <TextInput value={status} onChange={(value: any) => setStatus(value)} name="status" title="Status" containerStyle={{ marginTop: '1.15vh', marginBottom: '1.15vh' }}  />
                </Modal.Body>
                <Modal.Footer>
                <InputButton variant="light" onClick={props?.onClose} label="Cancel" containerStyle={{ width: "47.25%" }} />
                <InputButton variant="danger" label="Add" containerStyle={{ width: "47.25%" }} onClick={handleAddTransaction} />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddTransactionModal;
