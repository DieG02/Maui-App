import Modal from "react-native-modal"
import { useQuery } from "react-query";
import useToggle from "../../../hooks/useToggle"
import customStyles from "../../../styles/customStyles";
import Button from "../Button"

interface Props {
    children: React.ReactNode
    title: string
}

const { mainColor } = customStyles

export default function CustomModal({ children, title }: Props) {
    const { value, toggle, setToggle } = useToggle()
    useQuery('CloseModel', () => setToggle(false))

    return <>
        <Button text={title}
            onPress={toggle}
            style={{ backgroundColor: mainColor }} />
        <Modal isVisible={value}
            useNativeDriverForBackdrop
            onBackButtonPress={toggle}
            onBackdropPress={toggle}
            onSwipeComplete={toggle}>
            {children}
        </Modal>
    </>
}