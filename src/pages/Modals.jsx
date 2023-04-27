import { useState, useEffect } from "react";

const Modals = () => {
    const [showModals, setShowModals] = useState({simpleModal: false, modalWithHeader: false, animatedModal: false});
    const [showAlerts, setShowAlerts] = useState({success: false, info: false, warning: false, danger: false});
   
    const showModal = (e) => {
       const id = e.target.dataset.id;
       switch (id) {
            case "simple-modal":
                setShowModals({simpleModal: true});
                break;
            case "modal-with-header-footer":
                setShowModals({modalWithHeader: true});
                break;
            case "animated-modal":
                setShowModals({animatedModal: true});
                break;
            default:
                break;
       }
    }
    const closeModal = (e) => {
        const id = e.target.id;
        switch (id){
            case "close-simple-modal":
                setShowModals({simpleModal: false});
                break;
            case "close-header-modal":
                setShowModals({modalWithHeader: false});
                break;
            case "close-animated-modal":
                setShowModals({animatedModal: false});
                break;
            default:
                break;
        }
    }
    const showAlert = (e) => {
        const id = e.target.dataset.id;
        switch (id) {
            case "alert-success":
                setShowAlerts({success: true, info: false, warning: false, danger: false});
                break;
            case "alert-info":
                setShowAlerts({success: false, info: true, warning: false, danger: false});
                break;
            case "alert-warning":
                setShowAlerts({success: false, info: false, warning: true, danger: false});
                break;
            case "alert-danger":
                setShowAlerts({success: false, info: false, warning: false, danger: true});
                break;
            default:
                setShowAlerts({success: false, info: false, warning: false, danger: false});
                break;
        }
    }
    const handleRemoveAlert = () => {
        return setShowAlerts({success: false, info: false, warning: false, danger: false});
    }
    useEffect(() => {
        let removeAlert = setTimeout(() => {
            handleRemoveAlert();
        }, 3000);
        //clean up function
        return () => clearTimeout(removeAlert);
    }, [showAlerts])
    return (
        <section className="modals-section">
            <div className="heading">
                <h2>modals & alerts</h2>
            </div>
            <div className="modals">
                <div className="modal-title">
                    <h2>modals</h2>
                </div>
                <div className="modal-buttons">
                    <button data-id="simple-modal" className="modal simple-modal" onClick={showModal}>simple modal</button>
                    <button data-id="modal-with-header-footer" className="modal modal-with-header-footer" onClick={showModal}>header & footer</button>
                    <button data-id="animated-modal" className="modal animated-modal" onClick={showModal}>animated modal</button>
                </div>
            </div>
            <div className="alerts">
                <div className="alert-title">
                    <h2>alerts</h2>
                </div>
                <div className="alert-buttons">
                    <button data-id="alert-success" className="alert-btn alert-btn-success" onClick={showAlert}>alert success</button>
                    <button data-id="alert-info" className="alert-btn alert-btn-info" onClick={showAlert}>alert info</button>
                    <button data-id="alert-warning" className="alert-btn alert-btn-warning" onClick={showAlert}>alert warning</button>
                    <button data-id="alert-danger" className="alert-btn alert-btn-danger" onClick={showAlert}>alert danger</button>
                </div>

            </div>
            {/* modals and content */}
            {showModals.simpleModal && <div id="simple-modal" className="modal-overlay">
                <div className="modal-content simple-modal">
                    <div className="modal-title">
                        <h2>simple modal</h2>
                        <i id="close-simple-modal" className="fas fa-times close-modal" onClick={closeModal}></i>
                    </div>
                    <div className="modal-body">
                        <p>This is a simple modal</p>
                    </div>
                </div>
            </div>}
            {showModals.modalWithHeader && <div id="modal-with-header-footer" className="modal-overlay">
                <div className="modal-content modal-with-header-footer">
                    <div className="modal-header">
                        <h2>modal header</h2>
                        <i id="close-header-modal" className="fas fa-times close-modal" onClick={closeModal}></i>
                    </div>
                    <div className="modal-body">
                        <p>This is a modal with a header and footer</p>
                        <p>This modal also has a body</p>
                    </div>
                    <div className="modal-footer">modal footer</div>
                </div>
            </div>}
            {showModals.animatedModal && <div id="animated-modal" className="modal-overlay">
                <div className="modal-content animated-modal">
                    <div className="modal-title">
                        <h2>animated modal</h2>
                        <i id="close-animated-modal" className="fas fa-times close-modal" onClick={closeModal}></i>
                    </div>
                    <div className="modal-body">
                        <p>This is an animated modal</p>
                        <p>This animated modal increases in scale and rotates slightly</p>
                    </div>
                </div>
            </div>}
            {/* alerts and content */}
            <div className="alerts-container">
                {showAlerts.success && <div className="alert alert-success">
                    <i className="fas fa-check alert-icon success"></i>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
                </div>}
                {showAlerts.info && <div className="alert alert-info">
                    <i className="fas fa-info alert-icon info"></i>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
                </div>}
                {showAlerts.warning && <div className="alert alert-warning">
                    <i className="fas fa-exclamation-triangle alert-icon warning"></i>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
                </div>}
                {showAlerts.danger && <div className="alert alert-danger">
                    <i className="fas fa-ban alert-icon danger"></i>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
                </div>}
            </div>
        </section>
    )
    
}

export default Modals;