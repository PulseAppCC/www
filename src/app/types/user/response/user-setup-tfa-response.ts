/**
 * The response for when a {@link User}
 * initializes the setup of two-factor
 * authentication.
 */
export type UserSetupTfaResponse = {
    /**
     * The TFA secret.
     */
    secret: string;

    /**
     * The URL to the QR code.
     */
    qrCodeUrl: string;
};
