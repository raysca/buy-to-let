interface InputViewProps {
    value: number;
    property: string;
    label: string;
    description: string;
    onChange: (a: { property: string, value: number }) => void;
}

export const InputView = (props: InputViewProps) => {
    const { value, property, label, description, onChange } = props;
    return (
        <div className="uk-margin">
            <label htmlFor={property} className="uk-form-label">{label}</label>
            <div className="uk-form-controls uk-line uk-margin-small">
                <input
                    id={property}
                    className="uk-input uk-form-width-full"
                    type="number"
                    min={0}
                    defaultValue={value}
                    onChange={e => onChange({ property, value: parseInt(e.target.value) })}
                />
            </div>
        </div>
    );
}