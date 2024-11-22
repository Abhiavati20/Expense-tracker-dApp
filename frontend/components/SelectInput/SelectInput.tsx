import React from 'react'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select'
import { ISelectInputOptions } from '@/lib/utils'

const SelectInput = ({options,placeholder}:{options:ISelectInputOptions[], placeholder:string}) => {
  return (
    <Select>
        <SelectTrigger className="w-full mx-2">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
              {
                  options.map((option, index) =>
                    <SelectItem key={index} value={option.value}>
                        {option.option}
                    </SelectItem>)
              }
        </SelectContent>
    </Select>
  )
}

export default SelectInput