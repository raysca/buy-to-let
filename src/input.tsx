interface InputViewProps {
    value: number;
    property: string;
    label: string;
    description: string;
    max?: number;
    min?: number;
    step?: string;
    useDanger?: boolean;

    onChange: (a: { property: string, value: number }) => void;
}

export const CurrencyInput = (props: InputViewProps) => {
    const { value, property, label, max = 100, min = 0, step = '1', onChange } = props;
    const formatter = Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

    const inputClass = props.useDanger ? 'range-warning' : 'range-success';

    return (
        <div className="w-full grid grid-flow-row space-y-1">
            <p className="flex justify-between">
                <span>{label}</span> 
                <span>{formatter.format(value)}</span>
            </p>
            <input
                id={property}
                className={`range md:range-xs w-full ${inputClass}`}
                type="range"
                min={min}
                max={max}
                step={step}
                defaultValue={value}
                onChange={e => onChange({ property, value: parseFloat(e.target.value) })}
            />
        </div>
    );
}

export const PercentageInput = (props: InputViewProps) => {
    const { value, property, label, max = 100, min = 0, step = '1', onChange } = props;
    const inputClass = props.useDanger ? 'range-warning' : 'range-success';
    
    return (
        <div className="w-full grid grid-flow-row space-y-1">
            <p className="flex justify-between align-middle">
                <span>{label}</span> 
                <span>{value.toFixed(2)}%</span>
            </p>
            <input
                id={property}
                className={`range md:range-xs w-full ${inputClass}`}
                type="range"
                min={min}
                max={max}
                step={step}
                defaultValue={value}
                onChange={e => onChange({ property, value: parseFloat(e.target.value) })}
            />
        </div>
    );
}

export const NumberInput = (props: InputViewProps) => {
    const { value, property, label, max = 100, min = 0, step = '1', onChange } = props;
    const inputClass = props.useDanger ? 'range-warning' : 'range-success';

    return (
        <div className="w-full grid grid-flow-row space-y-1">
            <p className="flex justify-between align-middle">
                <span>{label}</span> 
                <span>{value}</span>
            </p>
            <input
                id={property}
                className={`range md:range-xs w-full ${inputClass}`}
                type="range"
                min={min}
                max={max}
                step={step}
                defaultValue={value}
                onChange={e => onChange({ property, value: parseInt(e.target.value) })}
            />
        </div>
    );
}