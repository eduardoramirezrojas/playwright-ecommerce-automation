export type AddressType = {
    name: string;
    middleName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    state: string;
    city: string;
    pinCode: string;
};

export type RequiredField = {
    field: keyof AddressType;
    error: string;
    errorTestId: string;
};

export type PhoneBoundaryCase = {
    phone: string;
    shouldBeValid: boolean;
};

export type ConfirmField = {
    field: keyof AddressType;
    testId: string;
};