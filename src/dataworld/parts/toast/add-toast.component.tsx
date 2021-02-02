import React from 'react'
import { toast, ToastPosition, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

interface Toast {
    message: string,
    position?: ToastPosition
    type: TypeOptions
}

export default function addToast({ message, position = "top-right", type }: Toast): React.ReactNode {
    return toast(message, { position: position, type: type })
}