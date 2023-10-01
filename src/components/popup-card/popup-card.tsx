import { Popup } from "components/UI/popup/popup"
import { Card } from "types/types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    card: Card | undefined;
}

export const PopupCard: React.FC<Props> = ({isOpen, onClose, card}) => {
    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>{card?.title}</div>
        </Popup>
    )
}