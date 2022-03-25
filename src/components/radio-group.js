import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const InputRadioGroup = ({ list, onChange }) => {
    let [option, setOption] = useState(null)

    useEffect(() => {
        onChange((state) => ({ ...state, type: option }))
    }, [option])

    return (
        <RadioGroup
            value={option}
            onChange={setOption}
            className="flex space-x-4"
        >
            {list.map((item, i) => (
                <RadioGroup.Option
                    key={i}
                    value={item.value}
                    className={({ active, checked }) =>
                        `radio-group ${active && 'radio-group-active'}
                ${checked ? 'radio-group-checked' : 'bg-white'}`
                    }
                >
                    {item.icon ?? ''}
                    {item.name}
                </RadioGroup.Option>
            ))}
        </RadioGroup>
    )
}

export default InputRadioGroup
