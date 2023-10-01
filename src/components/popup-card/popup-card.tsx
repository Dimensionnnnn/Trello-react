import { Popup } from "components/UI/popup/popup"
import { Card } from "types/types";

interface Props {
    isActive: boolean;
    setActive: (active: boolean) => void;
    card: Card | undefined;
}

export const PopupCard: React.FC<Props> = ({card, ...props}) => {
    return (
        <Popup
            isActive={props.isActive}
            setActive={props.setActive}
        >
            <div>{card?.title}</div>
        </Popup>
    )
}