
type selectOptions = {
    id: string;
    name: string;
}
interface SelectBoxProps {
    id: string;
    options: selectOptions[];
    selectRef: React.MutableRefObject<HTMLSelectElement> ;
    defaultOption: string;
}

const SelectBox:React.FC<SelectBoxProps> = ({id, options, selectRef, defaultOption}) => {

    return (
        <select ref={selectRef} id={id}>
            <option value="">{defaultOption}</option>
            {options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
        </select>
    )
}

export default SelectBox;