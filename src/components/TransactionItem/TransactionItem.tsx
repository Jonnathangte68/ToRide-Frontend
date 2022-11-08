// import "./contact-support-style.css";

interface TransactionItemProps {
    id: number;
    status: 'Completed' | 'Declined' | 'Pending';
    date: string;
    amount: number;
}

const TransactionItem: React.FC<TransactionItemProps> = (props: TransactionItemProps) => {

    const getTransactionImage = () => {
        if (props?.status === "Completed") {
            return "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1627%3A62361?alt=media&token=42183d99-0e70-4b5e-ad16-65c3dbc8a520";
        }
        if (props?.status === "Declined") {
            return "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1627%3A62376?alt=media&token=e3c5aaf9-2ecb-4f7b-8cb4-d45bb6e86569";
        }
        if (props?.status === "Pending") {
            return "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/7e3bewn1zj-1627%3A62391?alt=media&token=0b6e973f-1617-496b-acc2-36721b9cdf9d";
        }
        return "";
    };

    const getTransactionResult = () => {
        switch(props?.status) {
            case "Declined":
                return "Failed";
            case "Pending":
                return "Pending";
            default:
                return 'Payment';
        }
    };

    return (
        <div className="set-fixed-width-transaction-element transaction-no-space-left transaction-history flex-row-vstart-hstart">
            <img
                src={getTransactionImage()}
                alt="Not Found"
                className="icon-8"
            />
            <div className="frame-292 flex-col-hstart-vstart set-col-width-1">
                <p className="txt-286">{`${getTransactionResult()} from #${props?.id}`}</p>
                <div className="arrows flex-row-vstart-hstart set-date-details-width">
                <p className="txt-580">{`${props?.date}`}</p>
                <p className="txt-471">{`${props?.date}`}</p>
                </div>
            </div>
            <div className="transaction-no-space-left info-1 flex-col-hstart-vstart flex-col-hstart-ending set-col-width-2">
                <p className="txt-919 flex-hend">{`+ €${props?.amount}`}</p>
                <p className="txt-0301 flex-hend">{`${props?.status}`}</p>
            </div>
        </div>
    );
}

export default TransactionItem;