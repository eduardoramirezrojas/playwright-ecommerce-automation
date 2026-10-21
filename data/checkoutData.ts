import {
    AddressType,
    ConfirmField,
    PhoneBoundaryCase,
    RequiredField,
} from '../types/checkout.types';

export const requiredFields: RequiredField[] = [
    {
        field: 'name',
        error: 'Please enter your first name.',
        errorTestId: 'checkout-firstname-error',
    },
    {
        field: 'lastName',
        error: 'Please enter your last name.',
        errorTestId: 'checkout-lastname-error',
    },
    {
        field: 'email',
        error: 'Please enter your email.',
        errorTestId: 'checkout-email-error',
    },
    {
        field: 'mobile',
        error: 'Please enter your phone number.',
        errorTestId: 'checkout-phone-error',
    },
    {
        field: 'address',
        error: 'Please enter your address.',
        errorTestId: 'checkout-address-error',
    },
    {
        field: 'state',
        error: 'Please enter your state.',
        errorTestId: 'checkout-state-error',
    },
    {
        field: 'city',
        error: 'Please enter your city.',
        errorTestId: 'checkout-city-error',
    },
    {
        field: 'pinCode',
        error: 'Please enter your pincode.',
        errorTestId: 'checkout-pincode-error',
    },
];

export const validAddress: AddressType = {
    name: 'Eduardo',
    middleName: 'Ramirez',
    lastName: 'Rojas',
    email: 'edu@gmail.com',
    mobile: '1234567890',
    address: 'SiempreViva',
    state: 'Florida',
    city: 'Miami',
    pinCode: '12345',
};

export const invalidEmails: string[] = [
    'ed',
    'edu@',
    '@gmail.com',
];

export const phoneBoundaryCases: PhoneBoundaryCase[] = [
    {
        phone: '123456789',
        shouldBeValid: false,
    },
    {
        phone: '1234567890',
        shouldBeValid: true,
    },
    {
        phone: '12345678901',
        shouldBeValid: false,
    },
];

export const confirmFields: ConfirmField[] = [
    {
        field: 'name',
        testId: 'confirm-firstname',
    },
    {
        field: 'middleName',
        testId: 'confirm-middlename',
    },
    {
        field: 'lastName',
        testId: 'confirm-lastname',
    },
    {
        field: 'email',
        testId: 'confirm-email',
    },
    {
        field: 'mobile',
        testId: 'confirm-phone',
    },
    {
        field: 'address',
        testId: 'confirm-address',
    },
    {
        field: 'state',
        testId: 'confirm-state',
    },
    {
        field: 'city',
        testId: 'confirm-city',
    },
    {
        field: 'pinCode',
        testId: 'confirm-pincode',
    },
];
