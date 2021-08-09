import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify'

const ConfirmBox = ({message, onConfirm, id, callback}) => {

    const executeConfirm = () => {
        if (id) {
            onConfirm(id);
        }
        else {
            onConfirm();
        }

        callback();
    }

    return (
        <>
            <Row>
                <Col>{message}</Col>
            </Row>
            <Row>
                <Col className="py-3">
                    <Button variant="danger" onClick={executeConfirm} size="sm">Yes</Button>&nbsp;
                    <Button onClick={() => callback()} variant="secondary" size="sm">No</Button>
                </Col>
            </Row>
        </>
    )
}

export const confirmAlert = (message, onConfirm, id, callback) => {
    toast.warning(<ConfirmBox message={message} onConfirm={onConfirm} id={id} callback={callback} />, {
        autoClose: false
    });
}
