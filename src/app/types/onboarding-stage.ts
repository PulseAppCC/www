/**
 * An onboarding stage.
 */
type OnboardingStage = {
    /**
     * The name of this stage.
     */
    name: string;

    /**
     * The description of this stage.
     */
    description: string;

    /**
     * The form schema for this stage.
     */
    schema: any;
};
