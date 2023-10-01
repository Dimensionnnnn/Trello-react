import { Popup } from "components/UI/popup/popup"
import { Card } from "types/types";

interface Props {
    activeCardId: string | null;
    closePopup: (cardId: string | null) => void;
    card: Card | undefined;
}

export const PopupCard: React.FC<Props> = ({activeCardId, closePopup, card}) => {
    const handleClose = () => {
        closePopup(null);
    }

    return (
        <Popup
            isActive={!!activeCardId}
            setActive={handleClose}
        >
            <div>{card?.title}</div>
        </Popup>
    )
}