import Select from 'react-select';

export interface SelectOption {
  value: string;
  label: string;
}

interface StyledSelectProps {
  options: SelectOption[];
  defaultOption?: SelectOption;
  value?: SelectOption;
  onChange?: (selectedOption: SelectOption | null) => void;
}

export default function StyledSelect({
  options,
  defaultOption,
  value,
  onChange,
}: StyledSelectProps) {
  return (
    <Select
      options={options}
      required
      value={value || defaultOption}
      onChange={onChange}
      defaultValue={defaultOption}
      isSearchable={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'var(--color-light-gray)',
          color: 'var(--color-dark-blue)',
          border: 'none',
          boxShadow: 'none',
          fontSize: 'var(--fs-xs)',
          fontWeight: 700,
          cursor: 'pointer',
          padding: '0.44rem 0.25rem',
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--color-dark-blue)',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'var(--color-white)',
          color: 'var(--color-black)',
          border: 'none',
          boxShadow: 'var(--box-shadow)',
        }),
        option: (baseStyles, { isFocused }) => ({
          ...baseStyles,
          backgroundColor: 'none',
          cursor: 'pointer',
          color: isFocused
            ? 'var(--color-purple-hover)'
            : 'var(--color-dark-blue)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 700,
          borderBottom: '1px solid var(--color-gray)',
        }),
      }}
    />
  );
}
