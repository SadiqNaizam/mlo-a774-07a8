import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ColorPickerInputProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({ label, color, onChange, className }) => {
  console.log('ColorPickerInput loaded');

  // A basic validation for hex colors to avoid style errors
  const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Label htmlFor={`${label}-color-input`}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-24 justify-start text-left font-normal"
            id={`${label}-color-input`}
          >
            <div className="flex w-full items-center gap-2">
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{
                  backgroundColor: isValidHex(color) ? color : '#FFFFFF',
                  border: '1px solid #e2e8f0' // slate-200
                }}
              />
              <div className="flex-1 truncate">{color}</div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="end">
            <div className="space-y-2">
                <Label htmlFor={`${label}-hex-input`} className="font-semibold">Hex Color</Label>
                <Input
                    id={`${label}-hex-input`}
                    value={color}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    className="h-8"
                />
            </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ColorPickerInput;