import { Popup } from "components/UI/popup/popup"
import { Card } from "types/types";

interface Props {
    cardId: string | null;
    setActive: (cardId: string | null) => void;
    getCardById: (cardId: string | null) => Card | undefined;
}

export const PopupCard: React.FC<Props> = ({cardId, setActive, getCardById}) => {
    const card = getCardById(cardId);

    const handleClose = () => {
        setActive(null);
    }

    return (
        <Popup
            isActive={!!cardId}
            setActive={handleClose}
        >
            <div>{card?.title}</div>
        </Popup>
    )
}