export type LineNotifySendRequest = {
    token: string
    message: string
    notificationDisabled?: boolean
}

export type GroveBuzzerAlertStopHandler = { (): void }