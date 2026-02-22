import { useState } from "react"
import { login } from "../../services/auth.service";
import { notifications } from "@mantine/notifications";
import { setLocalStorage } from "../../utils/storage/storage";
import { useNavigate } from "react-router-dom";

const useLoginHook = () => {
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [emailId, setEmailId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<"admin" | "staff" | "student">('admin');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setBtnLoading(true);
            const response = await login({ emailId, password }, role);
            if (response.status !== 200) {
                return notifications.show({
                    title: 'Error',
                    message: response?.data?.error,
                    color: 'red'
                })
            } else {
                const loggedDet = response?.data;
                setLocalStorage('loggedDetails', loggedDet);
                navigate('/admin');
            }
        } catch (error) {
            console.error(error)
        } finally {
            setBtnLoading(false);
        }
    }

    return {
        handleLogin,
        btnLoading,
        setEmailId,
        emailId,
        setPassword,
        password,
        role,
        setRole
    }
}

export default useLoginHook