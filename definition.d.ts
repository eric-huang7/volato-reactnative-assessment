interface DataModel {
    name: string;
    fields: {
        [key: string]: {
            label: string;
            type: 'string' | 'number';
            readOnly: boolean;
            calculate: string | null;
        }
    }
}

interface DropdownOption {
    label: string;
    value: string;
}